import os
from flask import Flask
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from .routes import auth_bp
from .quizzes import quiz_bp
from ..config import Config
from flask_mail import Mail
from .models import db

bcrypt = Bcrypt()
mail = Mail()


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    # Configurations for SQLAlchemy
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://earuser:2222@localhost/earhealth'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    bcrypt.init_app(app)
    mail.init_app(app)

    # Initialize Flask-Migrate
    migrate = Migrate(app, db)

    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(quiz_bp)

    return app