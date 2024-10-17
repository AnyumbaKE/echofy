from datetime import datetime, timedelta
from flask import Blueprint, request, jsonify, url_for, current_app
from .models import db, User
from flask_cors import CORS
from flask_mail import Mail, Message
import random, string

auth_bp = Blueprint('auth', __name__)
CORS(auth_bp)
mail = Mail()


@auth_bp.route('/register', methods=['POST'], strict_slashes=False)
def register():
    from . import bcrypt
    username = request.json.get('username')
    email = request.json.get('email')
    password = request.json.get('password')

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    if not username or not email or not password:
        return jsonify({'error': 'Missing username, email, or password'}), 400

    existing_user = User.query.filter_by(email=email, username=username).first()
    if existing_user:
        return jsonify({'error': 'User already exists'}), 400

    new_user = User(username=username, email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201


# Helper function to authenticate user

def authenticate_user(email, password):
    from . import bcrypt
    user = User.query.filter_by(email=email).first()
    if user and bcrypt.check_password_hash(user.password, password):
        return user
    return None


@auth_bp.route('/login', methods=['POST'], strict_slashes=False)
def login():
    email = request.json.get('email')
    password = request.json.get('password')

    if not email or not password:
        return jsonify({'error': 'Missing email or password'}), 400

    user = authenticate_user(email, password)

    if user:
        return jsonify({'user': user.username, 'id': user.id, 'email': user.email}), 200
    else:
        return jsonify({'error': 'Invalid email or password'}), 401


# Helper function to send email to the user
def send_email(to, reset_url):
    msg = Message('Echofy: Password Reset Request',
                  sender=current_app.config['MAIL_DEFAULT_SENDER'],
                  recipients=[to])
    msg.body = f'Your Code to reset your password: {reset_url}'
    mail.send(msg)


@auth_bp.route('/forget_password', methods=['POST'], strict_slashes=False)
def forgot():
    email = request.json.get('email')

    if not email:
        return jsonify({'error': 'Missing email'}), 400

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({'error': "An Account With This Email Doesn't Exist"}), 400
    if user:
        otp = ''.join(random.choices(string.digits, k=6))
        user.otp = otp
        user.otp_expiry = datetime.utcnow() + timedelta(minutes=10)
        db.session.commit()
        send_email(email, f"Your Reset Code is {otp}")

    return jsonify(message="a reset code has been sent"), 200


@auth_bp.route('/verify_otp', methods=['POST'], strict_slashes=False)
def verify_otp():
    email = request.json.get('email')
    otp = request.json.get('otp')

    if not otp:
        return jsonify({'error': 'Missing OTP'}), 400

    user = User.query.filter_by(email=email, otp=otp).first()

    if user and user.otp_expiry > datetime.utcnow():
        return jsonify({'message': 'Verification Success'}), 200

    return jsonify({'error': 'Invalid or expired OTP'}), 400


@auth_bp.route('/reset_password', methods=['POST'], strict_slashes=False)
def reset_password():
    from . import bcrypt
    email = request.json.get('email')
    password = request.json.get('password')

    if not email or not password:
        return jsonify({'error': 'Missing email or new password'}), 400

    user = User.query.filter_by(email=email).first()

    if user:
        user.password = bcrypt.generate_password_hash(password).decode('utf-8')  # this will hash the pwd
        user.otp = None  # Clear the OTP after password reset
        user.otp_expiry = None

        db.session.add(user)  # this will overwrite the password
        db.session.commit()  # this commit the password
        return jsonify({'message': 'Password has been reset successfully.'}), 200

    return jsonify({'error': 'User not found'}), 400


@auth_bp.route('/change_password', methods=['POST'], strict_slashes=False)
def change_password():
    from . import bcrypt
    email = request.json.get('email')
    password = request.json.get('password')
    new_password = request.json.get('new_password')

    if not email or not password:
        return jsonify({'error': 'Missing email or old password'}), 400

    user = User.query.filter_by(email=email).first()

    if user:
        user.password = bcrypt.generate_password_hash(new_password).decode('utf-8')  # this will hash the pwd
        db.session.add(user)  # this will overwrite the password
        db.session.commit()  # this commit the password
        return jsonify({'message': 'Password has been reset successfully.'}), 200

    return jsonify({'error': 'User not found'}), 400