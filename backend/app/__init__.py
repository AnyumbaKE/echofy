from flask import Flask
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from flask_mail import Mail
from flask_cors import CORS
from ..config import Config
from .models import db

# Initialize extensions
bcrypt = Bcrypt()
mail = Mail()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    CORS(app)

    # Load configurations from the Config class
    app.config.from_object(Config)

    # Initialize extensions with the app
    db.init_app(app)
    bcrypt.init_app(app)
    mail.init_app(app)
    migrate.init_app(app, db)  # Initialize Flask-Migrate

    # Import and register blueprints (avoiding circular imports)
    from .routes import auth_bp
    from .quizzes import quiz_bp

    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(quiz_bp)

    return app

# Create the app instance
app = create_app()

if __name__ == '__main__':
    app.run(debug=True)