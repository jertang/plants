from flask import Flask, jsonify, request
from flask_cors import CORS #not sure when this is used for now 

app = Flask(__name__)

#homepage
@app.route("/")
def home():
    return "Test"

#second page for asking information
@app.route("/askinfo")
def askinfo():
    return "This is the ask info section"

if __name__ == "__main__":
    app.run(port=5000, debug=True) 

