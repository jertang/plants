import google.generativeai as genai
import os
import csv
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS

#load the environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

def load_crops_from_csv():
    crops = []
    file_path = os.path.join('data', 'Crop_Database_with_Days_to_Grow.csv')

    with open(file_path, newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        print("CSV Columns:", reader.fieldnames)  # ✅ PRINT 1: see actual column names

        for row in reader:
            name = row.get('Crop', '').strip()
            climate = row.get('Climate', '').strip()
            days_str = row.get('Days_to_Grow', '').strip()
            nutrition = row.get('Nutritional_Benefits', 'No nutrition info available').strip()

            if name and days_str.isdigit():
                days = int(days_str)

                climate_lower = climate.lower()
                if "cool" in climate_lower or "fall" in climate_lower:
                    climate_type = "Cold"
                elif "warm" in climate_lower or "summer" in climate_lower:
                    climate_type = "Hot"
                else:
                    climate_type = "Mild"

                crop_obj = {
                    "name": name,
                    "climate": climate_type,
                    "nutrition": nutrition,
                    "days": days
                }

                crops.append(crop_obj)

                print("Added crop:", crop_obj)  # ✅ PRINT 2: see every crop that is actually added

    print(f"Total crops loaded: {len(crops)}")  # ✅ PRINT 3: final confirmation
    return crops



def filter_crops(climate_type, time_limit):
    # 15 Crops Database
    crops = load_crops_from_csv()
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
    crops_list = [f"{crop['name']} ({crop['days']} days, {crop['climate']}) - {crop['nutrition']}" for crop in crops]
    prompt = (
        "Say 'Hey new gardener!' at the beginning.\n\n"
        "Here are some crops that grow well in the specified climate and time limit:\n\n"
        + "\n".join(crops_list)
        + "\n\n"
        "Please generate a friendly, thorough (3-4 sentences) summary that:\n"
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
    nutrition_benefits = data.get('nutritional_benefits')
    
    print(f"New submission: {name}, {climate}, {timeforgarden} days max")

    recommendations = filter_crops(climate, timeforgarden)
    print("Recommendations generated:", recommendations)

    summary = generate_summary(recommendations)
    
    # Return responses to frontend

    return jsonify({
        'message': 'Information received successfully!', 
        'recommendations' : recommendations,
        'LLM summary' : summary #AI generated summary of selected plants
    })



if __name__ == '__main__':
    app.run(debug=True, port=5000)
