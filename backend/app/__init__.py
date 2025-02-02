from flask import Flask
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from flask_mail import Mail
from ..config import Config
from .models import db

# Initialize extensions
bcrypt = Bcrypt()
mail = Mail()

def create_app():
    # Create the Flask app
    app = Flask(__name__)

    # Load configurations from the Config class
    app.config.from_object(Config)

    # database configuration
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://earuser:2222@localhost/earhealth'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Initialize extensions with the app
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

# Create the app instance
app = create_app()

if __name__ == '__main__':
    app.run(debug=True)
