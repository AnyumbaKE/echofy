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
