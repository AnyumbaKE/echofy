import json
import os, random, base64
from flask import Blueprint, request, jsonify
from flask_cors import CORS
from gtts import gTTS
from .models import db, Quiz

quiz_bp = Blueprint('quiz', __name__)
CORS(quiz_bp)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
QEasy = os.path.join(BASE_DIR, 'easyQuiz.json')
QMed = os.path.join(BASE_DIR, 'mediumQuiz.json')
QHard = os.path.join(BASE_DIR, 'hardQuiz.json')

# Load quiz from JSON file

def load_quiz_data(difficulty):
    if difficulty == 'hard':
        with open(QHard, 'r') as f:
            quiz_data = json.load(f)
            questions = quiz_data['quiz']['questions']
            random.shuffle(questions) #Shuffle the list of questions
            quiz_data['questions'] = questions # update shuffled questions
        return quiz_data
    elif difficulty == 'medium':
        with open(QMed, 'r') as f:
            quiz_data = json.load(f)
            questions = quiz_data['quiz']['questions']
            random.shuffle(questions) # update shuffled questions
            quiz_data['questions'] = questions  # update shuffled questions
        return  quiz_data
    elif difficulty == 'easy':
        with open(QEasy, 'r') as f:
            quiz_data = json.load(f)
            questions = quiz_data['quiz']['questions']
            random.shuffle(questions)  # update shuffled questions
            quiz_data['questions'] = questions  # update shuffled questions
        return quiz_data

# checking eligibility based on difficulty of the user exists

def check_eligibility(user_id, difficulty):
    if difficulty == 'easy':
        return True
    elif difficulty == 'medium':
        easy_quiz = Quiz.query.filter_by(user_id=user_id, difficulty='easy').first()
        if easy_quiz.score == 10:
            return True
    elif difficulty == 'hard':
        medium_quiz = Quiz.query.filter_by(user_id=user_id, difficulty='medium').first()
        if medium_quiz.score == 10:
           # if medium_quiz.score == 10:
                return True
    return "invalid difficulty"

# Encode audio files into base64 format.
def encode_audio_files(file_path):
    with open(file_path, 'rb') as audio_file:
        encoded_string = base64.b64encode(audio_file.read()).decode('utf-8')
        return encoded_string

# endpoint to fetch quiz data
@quiz_bp.route('/quiz', methods=['POST', 'GET'], strict_slashes=False)
def get_quiz():
    id = request.json.get('id')
    difficulty = request.json.get('difficulty')
    
    user_quizzes = Quiz.query.filter_by(user_id=id).all()

    # if the user is new, add them with an initial entry for 'easy' difficulty
    if not user_quizzes:
        new_quiz = Quiz(user_id=id, difficulty='easy', score=0)
        db.session.add(new_quiz)
        db.session.commit()

        if difficulty == "easy":
            quiz_data = load_quiz_data(difficulty)
            quiz = random.choice(quiz_data['questions'])
            audio_id = quiz['id']
            audio_text = quiz['audio']
            audio_answer = quiz['correctAnswer']
            tts = gTTS(text=audio_text, lang='en')
            audio_dir = './audio'
            os.makedirs(audio_dir, exist_ok=True) # Ensures that the directory exists

            file_path = os.path.join(audio_dir, 'easy.mp3')
            tts.save(file_path)
            encoded = encode_audio_files(file_path)

            response = {
                'id': audio_id,
                'audio': encoded,
                'answer': audio_answer
            }
            return jsonify(response)
        # for a new user, only allow 'easy' difficulty
        return "First time to quiz, You have to play Easy"

    elif user_quizzes:
        if difficulty == 'easy':
            quiz_data = load_quiz_data(difficulty)
            quiz = random.choice(quiz_data['questions'])
            audio_id = quiz['id']
            audio_text = quiz['audio']
            audio_answer = quiz['correctAnswer']
            tts = gTTS(text=audio_text, lang='en')
            audio_dir = './audio'
            os.makedirs(audio_dir, exist_ok=True) # Ensures that the directory exists

            file_path = os.path.join(audio_dir, 'easy.mp3')
            tts.save(file_path)
            encoded = encode_audio_files(file_path)

            response = {
                'id': audio_id,
                'audio': encoded,
                'answer': audio_answer
            }
            return jsonify(response)

        elif difficulty == 'medium':
            check = check_eligibility(id, difficulty)

            if check is True:
                quiz_data = load_quiz_data(difficulty)
                quiz = random.choice(quiz_data['questions'])
                audio_id = quiz['id']
                audio_text = quiz['audio']
                audio_answer = quiz['correctAnswer']
                tts = gTTS(text=audio_text, lang='en')
                audio_dir = './audio'
                os.makedirs(audio_dir, exist_ok=True)  # Ensures that the directory exists

                file_path = os.path.join(audio_dir, 'easy.mp3')
                tts.save(file_path)
                encoded = encode_audio_files(file_path)

                response = {
                    'id': audio_id,
                    'audio': encoded,
                    'answer': audio_answer
                }
                return jsonify(response)
            else:
                return jsonify({'error': f'You need to score 10/10 in the previous level to access {difficulty} quiz.'}), 403
        elif difficulty == 'hard':
            check = check_eligibility(id, difficulty)

            if check is True:
                quiz_data = load_quiz_data(difficulty)
                quiz = random.choice(quiz_data['questions'])
                audio_id = quiz['id']
                audio_text = quiz['audio']
                audio_answer = quiz['correctAnswer']
                tts = gTTS(text=audio_text, lang='en')
                file = './audio/easy.mp3'
                tts.save(file)
                encoded = encode_audio_files(file)

                response = {
                    'id': audio_id,
                    'audio': encoded,
                    'answer': audio_answer
                }
                return jsonify(response)
            else:
                return jsonify({'error': f'You need to score 10/10 in the previous level to access {difficulty} quiz.'}), 403
        else:
            return jsonify({'Error': 'Wrong difficulty'})
    else:
        return jsonify("Invalid"), 400

# getting all question from json file
def get_questions(difficulty):
    if difficulty == "easy":
        with open(QEasy, 'r') as f:
            quiz_data = json.load(f)
            questions = quiz_data['quiz']['questions']
        return questions
    elif difficulty == "medium":
        with open(QMed, 'r') as f:
            quiz_data = json.load(f)
            questions = quiz_data['quiz']['questions']
        return questions
    elif difficulty == "hard":
        with open(QHard, 'r') as f:
            quiz_data = json.load(f)
            questions = quiz_data['quiz']['questions']
        return questions
    return "Wrong Difficulty"

# function that calculates the score
def calculate_score(difficulty, user_answers):

    if not user_answers and not difficulty:
        return jsonify({'error': 'No answers provided'}), 400

    questions = get_questions(difficulty)
    score = 0

    for user_answer in user_answers:
        id = user_answer.get('id')
        answer = user_answer.get('answer')

        for question in questions:
            if id == question['id']:  # Accessing question properties correctly
                if answer.lower() == question['correctAnswer'].lower():  # making answer case-insensitive and checking correct answer
                    score += 1  # Increment the score for correct answers
                break  # Exit the inner loop once the question is found

    return score



