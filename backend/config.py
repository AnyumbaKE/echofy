import os
from dotenv import load_dotenv

# this will load environment variables from .env file
load_dotenv()

class Config:
    # secret key for session management and security
    SECRET_KEY = os.getenv('SECRET_KEY', 'your-secret-key-here')

    # debug mode - set to False in prod
    DEBUG = os.getenv('DEBUG','true').lower() == 'true'

    # mail configuration
    MAIL_SERVER = os.getenv('MAIL_SERVER', 'smtp.gmail.com')
    MAIL_PORT = int(os.getenv('MAIL_PORT', 587))
    MAIL_USE_TLS = os.getenv('MAIL_USE_TLS','true').lower() == 'true'
    MAIL_USERNAME = os.getenv('MAIL_USERNAME', 'your-email-address')
    MAIL_PASSWORD = os.getenv('MAIL_PASSOWRD', 'your-application-password') 

    # sender name and address
    MAIL_DEFAULT_SENDER = os.getenv('MAIL_DEFAULT_SENDER', ('Echofy noreply', 'your-email-address'))

    # database configuration
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URI', 'mysql+pymysql://earuser:2222@localhost/earhealth')
    SQLALCHEMY_TRACK_MODIFICATIONS = False