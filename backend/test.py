import google.generativeai as genai
import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS

#load the environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

def filter_crops(climate_type, time_limit):
    # 15 Crops Database
    crops = [
        {"name": "Lettuce", "climate": "Mild", "days": 30},
        {"name": "Spinach", "climate": "Mild", "days": 40},
        {"name": "Carrot", "climate": "Mild", "days": 50},
        {"name": "Radish", "climate": "Mild", "days": 25},
        {"name": "Peas", "climate": "Mild", "days": 60},
        {"name": "Tomato", "climate": "Hot", "days": 60},
        {"name": "Pepper", "climate": "Hot", "days": 70},
        {"name": "Okra", "climate": "Hot", "days": 50},
        {"name": "Kale", "climate": "Cold", "days": 40},
        {"name": "Broccoli", "climate": "Cold", "days": 50},
        {"name": "Cabbage", "climate": "Cold", "days": 70},
        {"name": "Beets", "climate": "Mild", "days": 60},
        {"name": "Swiss Chard", "climate": "Mild", "days": 45},
        {"name": "Zucchini", "climate": "Hot", "days": 50},
        {"name": "Corn", "climate": "Hot", "days": 90},
    ]
    #collect climate type 
    specific_climate = []
    for crop in crops: 
        if crop["climate"].lower() == climate_type.lower():
            specific_climate.append(crop)
        
    res = []
    for climate_crop in specific_climate: 
        if climate_crop["days"] <= time_limit:
            res.append(climate_crop)

    sorted_res = sorted(res, key=lambda x:x['days'])
    #print("Sorted crops:", sorted_res)
    return sorted_res


def generate_summary(crops):
    crops_list = [f"{crop['name']} ({crop['days']} days, {crop['climate']})" for crop in crops]
    prompt = (
        "Say 'Hey new gardener!' at the beginning.\n\n"
        "Here are some crops that grow well in the specified climate and time limit:\n\n"
        + "\n".join(crops_list)
        + "\n\n"
        "Please generate a friendly, thorough summary that:\n"
        "- Highlights the nutritional and health benefits of these crops.\n"
        "- Explains how easy each crop is to grow.\n"
        "- Mentions which season each crop grows best in."
    )

    genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

    #cover bug fix and test cases
    try:
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content(prompt)
        ai_summary = response.text
    except Exception as e:
        print("=== Gemini API ERROR START ===")
        print(repr(e))  # << print full raw error details
        print("=== Gemini API ERROR END ===")
        ai_summary = "We are currently unable to generate a summary. Please try again later."

    return ai_summary



@app.route('/')
def home():
    return "This is Flask backend, use the frontend at localhost:3000!"


@app.route('/submitinfo', methods=['POST'])
def submit_info():
    data = request.get_json()
    name = data.get('name')
    timeforgarden = int(data.get('timeforgarden'))
    state = data.get('state')
    climate = data.get('climate')
    
    print(f"New submission: {name}, {climate}, {timeforgarden} days max")

    recommendations = filter_crops(climate, timeforgarden)

    summary = generate_summary(recommendations)
    
    # Return responses to frontend

    return jsonify({
        'message': 'Information received successfully!', 
        'recommendations' : recommendations,
        'LLM summary' : summary #AI generated summary of selected plants
    })



if __name__ == '__main__':
    app.run(debug=True, port=5000)
