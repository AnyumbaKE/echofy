from backend.app import create_app, db
from backend.app.models import User

app = create_app()

@app.shell_context_processors
def make_shell_context():
    return {'db': db, 'User': User}

if __name__ == '__main__':
    app.run(debug=True)