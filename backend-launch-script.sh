#!/bin/bash

# Update instance & install flask
sudo apt update -y
sudo apt install -y python3-flask python3-pip
sudo apt install -y python3-flask-sqlalchemy
sudo apt install -y python3-flask-cors

FLASK_APP=$(cat <<EOF
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///notes.db'
db = SQLAlchemy(app)

class Note(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title=db.Column(db.String,nullable=True)
    content = db.Column(db.String, nullable=False)

with app.app_context():
    db.create_all()
    def populate_initial_data():
        notes = [
            {"title": "Note 1", "content": "This is the content of Note 1"},
            {"title": "Note 2", "content": "This is the content of Note 2"},
        ]
        for note_data in notes:
            existing_note = Note.query.filter_by(title=note_data["title"]).first()

            if existing_note is None:
                # Note does not exist, add it to the database
                new_note = Note(title=note_data["title"], content=note_data["content"])
                db.session.add(new_note)
                db.session.commit()


    # Call the function to populate initial data
    populate_initial_data()


#API endpoint to get all the notes
@app.route('/notes', methods=['GET'])
def get_all_note():
    notes = Note.query.all()
    all_notes = [{"id": note.id,"title":note.title, "content": note.content} for note in notes]
    return jsonify(all_notes)


# API endpoint to get a specific note
@app.route('/notes/<int:note_id>', methods=['GET'])
def get_note(note_id):
    note = Note.query.get(note_id)
    if note is not None:
        return jsonify({"content": note.content,'id':note_id})
    else:
        return jsonify({"error": "Note not found"}), 404

# API endpoint to update a note
@app.route('/notes/<int:note_id>', methods=['PUT'])
def update_note(note_id):
    note = Note.query.get(note_id)
    if note is not None:
        data = request.get_json()
        note.content = data['note']
        db.session.commit()
        return get_note(note_id)
    else:
        return jsonify({"error": "Note not found"}), 404

# API endpoint to delete a note
@app.route('/notes/<int:note_id>', methods=['DELETE'])
def delete_note(note_id):
    note = Note.query.get(note_id)
    if note is not None:
        db.session.delete(note)
        db.session.commit()
        return jsonify({"message": "Note deleted successfully"})
    else:
        return jsonify({"error": "Note not found"}), 404

# API endpoint to insert a new note
@app.route('/notes', methods=['POST'])
def insert_note():
    data = request.get_json()
    content = data.get('content')
    title=data.get('title')

    if content:
        new_note = Note(content=content,title=title)
        db.session.add(new_note)
        db.session.commit()
        
        return get_note((Note.query.filter_by(title=title).first()).id)
    else:
        return jsonify({"error": "Content not provided"}), 400

# Start flask server on port 80
if __name__ == '__main__':
    app.run(host='0.0.0.0',port=80,debug=True)

EOF
)

# write flask app into app.py file
sudo echo "$FLASK_APP" > /root/app.py

# start flask server
sudo python3 /root/app.py