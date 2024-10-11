import os

class Config:
    SECRET_KEY = 'your secret key'
    DEBUG = True

    # mail configuration
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = 'your email'
    MAIL_PASSWORD = 'Application password here'
    MAIL_DEFAULT_SENDER = ('Echofy noreply', 'noreply')