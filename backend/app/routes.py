from datetime import datetime, timedelta
from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import (
    create_access_token, jwt_required, get_jwt_identity
)
from .models import db, User
from flask_cors import CORS
from flask_mail import Mail, Message
import random, string
import pytz
from email_validator import validate_email, EmailNotValidError

auth_bp = Blueprint('auth', __name__)
CORS(auth_bp)
mail = Mail()
utc_time = datetime.now(pytz.utc)

# Helper function to validate email
def validate_email_address(email):
    try:
        validate_email(email)
        return True
    except EmailNotValidError:
        return False

# Helper function to authenticate user
def authenticate_user(email, password):
    from . import bcrypt
    user = User.query.filter_by(email=email).first()
    if user and bcrypt.check_password_hash(user.password, password):
        return user
    return None

# Helper function to send email
def send_email(to, subject, body):
    msg = Message(subject, sender=current_app.config['MAIL_DEFAULT_SENDER'], recipients=[to])
    msg.body = body
    mail.send(msg)

# User Registration
@auth_bp.route('/register', methods=['POST'], strict_slashes=False)
def register():
    from . import bcrypt
    username = request.json.get('username')
    email = request.json.get('email')
    password = request.json.get('password')
    role = request.json.get('role', 'user')

    if not username or not email or not password:
        return jsonify({'error': 'Missing username, email, or password'}), 400
    
    if not validate_email_address(email):
        return jsonify({'error': 'Invalid email address'}), 400

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'error': 'User already exists'}), 400
    
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(username=username, email=email, password=hashed_password, role=role)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201

# User Login
@auth_bp.route('/login', methods=['POST'], strict_slashes=False)
def login():
    email = request.json.get('email')
    password = request.json.get('password')

    if not email or not password:
        return jsonify({'error': 'Missing email or password'}), 400

    user = authenticate_user(email, password)

    if user:
        access_token = create_access_token(identity=user.id, expires_delta=timedelta(days=1))
        return jsonify({
            'user': user.username,
            'id': user.id,
            'email': user.email,
            'role': user.role,
            'access_token': access_token
        }), 200
    else:
        return jsonify({'error': 'Invalid email or password'}), 401

# Forgot Password (Send OTP)
@auth_bp.route('/forget_password', methods=['POST'], strict_slashes=False)
def forgot_password():
    email = request.json.get('email')

    if not email:
        return jsonify({'error': 'Missing email'}), 400

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({'error': "No account found with this email"}), 404
    
    otp = ''.join(random.choices(string.digits, k=6))
    user.otp = otp
    user.otp_expiry = datetime.now(pytz.utc) + timedelta(minutes=10)
    db.session.commit()

    send_email(email, 'Echofy: Password Reset Request', f"Your OTP to reset your password is: {otp}")

    return jsonify({'message': "An OTP has been sent to your email"}), 200

# Verify OTP & Generate Temporary Token
@auth_bp.route('/verify_otp', methods=['POST'], strict_slashes=False)
def verify_otp():
    email = request.json.get('email')
    otp = request.json.get('otp')

    if not otp:
        return jsonify({'error': 'Missing OTP'}), 400

    user = User.query.filter_by(email=email, otp=otp).first()

    if user and user.otp_expiry > datetime.now(pytz.utc):
        temp_token = create_access_token(identity=user.id, expires_delta=timedelta(minutes=10))

        return jsonify({
            'message': 'OTP verified successfully',
            'temp_token': temp_token
        }), 200
    else:
        return jsonify({'error': 'Invalid or expired OTP'}), 400

# Reset Password with Temporary Token
@auth_bp.route('/reset_password', methods=['POST'], strict_slashes=False)
@jwt_required()
def reset_password():
    from . import bcrypt
    current_user_id = get_jwt_identity()
    password = request.json.get('password')

    if not password:
        return jsonify({'error': 'Missing new password'}), 400

    user = User.query.get(current_user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404

    user.password = bcrypt.generate_password_hash(password).decode('utf-8')
    user.otp = None  # Clear OTP after successful reset
    user.otp_expiry = None
    db.session.commit()

    return jsonify({'message': 'Password reset successfully.'}), 200

# Change Password (Logged-in Users)
@auth_bp.route('/change_password', methods=['POST'], strict_slashes=False)
@jwt_required()
def change_password():
    from . import bcrypt
    current_user_id = get_jwt_identity()
    old_password = request.json.get('old_password')
    new_password = request.json.get('new_password')

    if not old_password or not new_password:
        return jsonify({'error': 'Missing old or new password'}), 400

    user = User.query.get(current_user_id)
    if not user or not bcrypt.check_password_hash(user.password, old_password):
        return jsonify({'error': 'Incorrect old password'}), 401

    user.password = bcrypt.generate_password_hash(new_password).decode('utf-8')
    db.session.commit()

    return jsonify({'message': 'Password changed successfully.'}), 200

# Admin-Only Route
@auth_bp.route('/admin_dashboard', methods=['GET'])
@jwt_required()
def admin_dashboard():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if not user or not user.is_admin():
        return jsonify({'error': 'Unauthorized access'}), 403

    return jsonify({'message': 'Welcome, Admin!'}), 200
