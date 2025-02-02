import os
from dotenv import load_dotenv
from app import create_app, db
from .app.models import User

# load environment variables from .env file
load_dotenv()

#create the Flask app
app = create_app()

# shell context for Flask CLI
@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'User': User}

# run the application
if __name__ == '__main__':
    app.run(debug=True)