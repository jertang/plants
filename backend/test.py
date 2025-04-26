from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "This is Flask backend, use the frontend at localhost:3000!"


@app.route('/submitinfo', methods=['POST'])
def submit_info():
    data = request.get_json()
    name = data.get('name')
    timeforgarden = data.get('timeforgarden')
    state = data.get('state')
    climate = data.get('climate')
    
    print(f"New submission: {name}, {timeforgarden}, {state}, {climate}")

    # (Optional) Save info somewhere later

    return jsonify({'message': 'Information received successfully!'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
