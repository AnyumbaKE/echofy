import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    # Secret key for session management and security
    SECRET_KEY = os.getenv('SECRET_KEY', 'your-secret-key-here')

    # Debug mode - set to False in production
    DEBUG = os.getenv('DEBUG', 'true').lower() == 'true'

    # Mail configuration
    MAIL_SERVER = os.getenv('MAIL_SERVER', 'smtp.gmail.com')
    MAIL_PORT = int(os.getenv('MAIL_PORT', 587))
    MAIL_USE_TLS = os.getenv('MAIL_USE_TLS', 'true').lower() == 'true'
    MAIL_USE_SSL = os.getenv('MAIL_USE_SSL', 'false').lower() == 'true'

    MAIL_USERNAME = os.getenv('MAIL_USERNAME', 'your-email-address')
    MAIL_PASSWORD = os.getenv('MAIL_PASSWORD', 'your-application-password')

    # Sender email address
    MAIL_DEFAULT_SENDER = os.getenv('MAIL_DEFAULT_SENDER', 'your-email-address')

    # Database configuration
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URI', 'mysql+pymysql://earuser:2222@localhost/earhealth')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
