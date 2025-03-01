import json
import os, random, base64
from flask import Blueprint, request, jsonify
from flask_cors import CORS
from gtts import gTTS
from .models import db, Quiz

quiz_bp = Blueprint('quiz', __name__)
CORS(quiz_bp)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
QUIZ_FILES = {
    'easy': os.path.join(BASE_DIR, 'easyQuiz.json'),
    'medium': os.path.join(BASE_DIR, 'mediumQuiz.json'),
    'hard': os.path.join(BASE_DIR, 'hardQuiz.json')
}

DIFFICULTIES = ["easy", "medium", "hard"]
AUDIO_DIR = os.path.join(BASE_DIR, 'audio')
os.makedirs(AUDIO_DIR, exist_ok=True)  # Ensure directory exists


def load_quiz_data(difficulty):
    """Loads and shuffles quiz questions from a JSON file based on difficulty."""
    file_path = QUIZ_FILES.get(difficulty)
    if not file_path:
        return None  # Handle invalid difficulty elsewhere

    with open(file_path, 'r') as f:
        quiz_data = json.load(f)
        questions = quiz_data.get('quiz', {}).get('questions', [])
        random.shuffle(questions)
        return questions


def check_eligibility(user_id, difficulty):
    """Checks if a user is eligible to take a quiz based on previous scores."""
    if difficulty not in ["medium", "hard"]:
        return True  # Easy is always allowed

    previous_difficulty = "easy" if difficulty == "medium" else "medium"
    previous_quiz = Quiz.query.filter_by(user_id=user_id, difficulty=previous_difficulty).first()

    return previous_quiz and previous_quiz.score == 6


def encode_audio_files(file_path):
    """Encodes an audio file in base64 format."""
    with open(file_path, 'rb') as audio_file:
        return base64.b64encode(audio_file.read()).decode('utf-8')


def generate_tts_audio(text, difficulty, question_id):
    """Generates and saves TTS audio for a question."""
    file_name = f"{difficulty}_{question_id}.mp3"
    file_path = os.path.join(AUDIO_DIR, file_name)
    tts = gTTS(text=text, lang='en')
    tts.save(file_path)
    return encode_audio_files(file_path)


@quiz_bp.route('/quiz', methods=['POST'])
def get_quiz():
    """Fetches quiz data based on user ID and difficulty."""
    data = request.json
    user_id = data.get('id')
    difficulty = data.get('difficulty')

    if difficulty not in DIFFICULTIES:
        return jsonify({'error': 'Invalid difficulty'}), 400

    user_quizzes = Quiz.query.filter_by(user_id=user_id).all()

    if not user_quizzes:
        # Create an initial quiz record for first-time users
        db.session.add(Quiz(user_id=user_id, difficulty="easy", score=0))
        db.session.commit()

        if difficulty != "easy":
            return jsonify({'error': "First-time users must start with 'Easy' difficulty"}), 403

    elif not check_eligibility(user_id, difficulty):
        return jsonify({'error': f'You need to score 6/10 in {difficulty} level before advancing'}), 403

    # Load quiz questions
    questions = load_quiz_data(difficulty)
    if not questions:
        return jsonify({'error': 'Quiz data not found'}), 500

    quiz = random.choice(questions)
    encoded_audio = generate_tts_audio(quiz['audio'], difficulty, quiz['id'])

    return jsonify({
        'id': quiz['id'],
        'audio': encoded_audio,
        'answer': quiz['correctAnswer']
    })


@quiz_bp.route('/quiz/submit', methods=['POST'])
def submit_quiz():
    """Submits quiz answers and updates the user's score."""
    data = request.json
    user_id = data.get('id')
    difficulty = data.get('difficulty')
    answers = data.get('answers')

    if not user_id or not difficulty or not answers:
        return jsonify({'error': 'Invalid request data'}), 400

    questions = load_quiz_data(difficulty)
    if not questions:
        return jsonify({'error': 'Quiz data not found'}), 500

    score = sum(
        1 for ans in answers if any(
            q for q in questions if q['id'] == ans['id'] and q['correctAnswer'].lower() == ans['answer'].lower()
        )
    )

    quiz = Quiz.query.filter_by(user_id=user_id, difficulty=difficulty).first()
    if quiz:
        quiz.score = score
    else:
        db.session.add(Quiz(user_id=user_id, difficulty=difficulty, score=score))
    
    db.session.commit()
    return jsonify({'message': f'Score for {difficulty} quiz submitted successfully.', 'score': score}), 200


@quiz_bp.route('/quiz/score', methods=['POST'])
def score_quiz():
    """Fetches the user's score for a given difficulty."""
    data = request.json
    user_id = data.get('id')
    difficulty = data.get('difficulty')

    if not user_id or not difficulty:
        return jsonify({'error': 'User ID and difficulty are required'}), 400

    quiz = Quiz.query.filter_by(user_id=user_id, difficulty=difficulty).first()
    return jsonify({'score': quiz.score if quiz else 0}), 200


@quiz_bp.route('/average', methods=['POST'])
def average():
    """Calculates and returns the user's average quiz score."""
    data = request.json
    user_id = data.get('id')

    if not user_id:
        return jsonify({'error': 'User ID is required'}), 400

    user_quizzes = Quiz.query.filter_by(user_id=user_id).all()

    if not user_quizzes:
        return jsonify({'message': 'You are new here, welcome!'}), 200

    total_score = sum(quiz.score for quiz in user_quizzes)
    average_score = total_score / len(user_quizzes) if user_quizzes else 0

    return jsonify({'average': f'{average_score:.2f}'}), 200
