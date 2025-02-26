import json
import os, random, base64
from flask_caching import Cache
from flask import Blueprint, request, jsonify
from flask_cors import CORS
from gtts import gTTS
from .models import db, Quiz, SeenQuestion, Leaderboard

cache = Cache()
quiz_bp = Blueprint('quiz', __name__)
CORS(quiz_bp)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
QUIZ_FILES = {
    'easy': os.path.join(BASE_DIR, 'easyQuiz.json'),
    'medium': os.path.join(BASE_DIR, 'mediumQuiz.json'),
    'hard': os.path.join(BASE_DIR, 'hardQuiz.json')
}

# Load quiz data with caching
@cache.memoize(timeout=300)
def load_quiz_data(difficulty):
    file_path = QUIZ_FILES.get(difficulty)
    if file_path and os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            return json.load(f).get('quiz', {}).get('questions', [])
    return []

# Get an unseen question for a user
def get_unseen_question(user_id, difficulty):
    seen_questions = {sq.question_id for sq in SeenQuestion.query.filter_by(user_id=user_id, difficulty=difficulty).all()}
    questions = load_quiz_data(difficulty)
    unseen_questions = [q for q in questions if q['id'] not in seen_questions]
    
    if not unseen_questions:
        SeenQuestion.query.filter_by(user_id=user_id, difficulty=difficulty).delete()
        db.session.commit()
        unseen_questions = questions  
    
    selected_question = random.choice(unseen_questions)
    db.session.add(SeenQuestion(user_id=user_id, question_id=selected_question['id'], difficulty=difficulty))
    db.session.commit()
    
    return selected_question

# Encode audio files
def encode_audio_files(file_path):
    with open(file_path, 'rb') as audio_file:
        return base64.b64encode(audio_file.read()).decode('utf-8')

# Checking eligibility based on user progress
def check_eligibility(user_id, difficulty):
    if difficulty == 'easy':
        return True
    
    required_score = 10
    prev_difficulty = 'easy' if difficulty == 'medium' else 'medium'
    previous_quiz = Quiz.query.filter_by(user_id=user_id, difficulty=prev_difficulty).first()
    
    return previous_quiz and previous_quiz.score >= required_score

# Fetch Quiz Question
@quiz_bp.route('/quiz', methods=['POST'])
def get_quiz():
    data = request.get_json()
    user_id, difficulty = data.get('id'), data.get('difficulty')
    
    if not check_eligibility(user_id, difficulty):
        return jsonify({'error': 'Not eligible for this difficulty level'}), 403
    
    quiz = Quiz.query.filter_by(user_id=user_id, difficulty=difficulty).first()
    if not quiz:
        quiz = Quiz(user_id=user_id, difficulty=difficulty, score=0)
        db.session.add(quiz)
        db.session.commit()
    
    question = get_unseen_question(user_id, difficulty)
    audio_text = question.get('audio', '')
    
    os.makedirs('./audio', exist_ok=True)
    audio_file = f'./audio/{difficulty}.mp3'
    gTTS(text=audio_text, lang='en').save(audio_file)
    
    return jsonify({'id': question['id'], 'audio': encode_audio_files(audio_file), 'answer': question['correctAnswer']})

# Submit Quiz Answers
@quiz_bp.route('/quiz/submit', methods=['POST'])
def submit_quiz():
    data = request.get_json()
    user_id, difficulty, answers = data.get('id'), data.get('difficulty'), data.get('answers')
    
    correct_answers = {q['id']: q['correctAnswer'].lower() for q in load_quiz_data(difficulty)}
    score = sum(1 for ans in answers if ans['answer'].lower() == correct_answers.get(ans['id'], '').lower())
    
    quiz = Quiz.query.filter_by(user_id=user_id, difficulty=difficulty).first()
    if quiz:
        quiz.score = score
    else:
        db.session.add(Quiz(user_id=user_id, difficulty=difficulty, score=score))
    db.session.commit()
    
    update_leaderboard(user_id, data.get('username'), score)
    return jsonify({'message': f'Score for {difficulty} quiz submitted successfully.', 'score': score})

# Update Leaderboard
def update_leaderboard(user_id, username, score):
    entry = Leaderboard.query.filter_by(user_id=user_id).first()
    if entry:
        entry.total_score += score
    else:
        db.session.add(Leaderboard(user_id=user_id, username=username, total_score=score))
    db.session.commit()

# Get Leaderboard
@quiz_bp.route('/leaderboard', methods=['GET'])
def get_leaderboard():
    leaders = Leaderboard.query.order_by(Leaderboard.total_score.desc()).limit(10).all()
    return jsonify([{'username': l.username, 'total_score': l.total_score} for l in leaders])
