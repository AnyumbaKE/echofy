from flask import Flask
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from config import Config
from flask_mail import Mail
from flask_sqlalchemy import SQLAlchemy

bcrypt = Bcrypt()
mail = Mail()
db= SQLAlchemy()


def create_app():
    # Create the Flask app
    app = Flask(__name__)

    # loads configurations from config class
    app.config.from_object(Config)

    # initialize extensions with the app
    db.init_app(app)
    bcrypt.init_app(app)
    mail.init_app(app)

    # Initialize Flask-Migrate
    migrate = Migrate(app, db)

    # Register blueprints
    from .routes import auth_bp
    from .quizzes import quiz_bp
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(quiz_bp)

    return app

# create the app
app = create_app()

if __name__ == '__main__':
    app.run(debug=True)