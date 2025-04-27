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

recipes_by_crop = {}

def load_recipes_from_csv():
    global recipes_by_crop
    file_path = os.path.join('data', 'Plant_Recipes.csv')  # Adjust filename if different

    with open(file_path, newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            crop = row.get('Crop Name', '').strip()
            if crop:
                recipes = []
                for i in range(1, 4):  # 3 recipes per crop
                    title = row.get(f'Recipe Name {i}', '').strip()
                    url = row.get(f'Link{i}', '').strip()
                    if title and url:
                        recipes.append({
                            "title": title,
                            "url": url
                        })
                recipes_by_crop[crop] = recipes

    print(f"Loaded {len(recipes_by_crop)} crops with recipes.")

def load_crops_from_csv():
    crops = []
    file_path = os.path.join('data', 'Crop_Database_with_Days_to_Grow.csv')

    with open(file_path, newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        print("CSV Columns detected:", reader.fieldnames)

        for row in reader:
            name = row.get('Crop', '').strip()
            climate = row.get('Climate', '').strip().capitalize()  # 🛠 Trust CSV and just capitalize
            days_str = row.get('Days_to_Grow', '').strip()
            nutrition = row.get('Nutritional_Benefits', 'No nutrition info available').strip()
            soil_type = row.get('Soil_Type', 'No soil type info').strip()
            water_needs = row.get('Water_Needs', 'No water needs info').strip()

            if not name or not days_str:
                print(f"Skipping row due to missing name or days: {row}")
                continue

            try:
                days = int(float(days_str))  # Handles '45', '45.0', etc.

                crop_obj = {
                    "name": name,
                    "climate": climate,
                    "nutrition": nutrition,
                    "days": days,
                    "soil_type": soil_type,
                    "water_needs": water_needs
                }

                crops.append(crop_obj)

            except ValueError:
                print(f"Skipping row due to invalid Days_to_Grow value: {row}")

    print(f"✅ Total crops successfully loaded: {len(crops)}")
    return crops





def filter_crops(climate_type, dedication_level):
    crops = load_crops_from_csv()

    dedication_ranges = {
        "low": (0, 30),
        "medium": (31, 75),
        "high": (76, 150)
    }

    min_days, max_days = dedication_ranges.get(dedication_level.lower(), (0, 9999))
    print(f"Dedication Level: {dedication_level} -> Days range: {min_days}-{max_days}")
    print(f"User requested Climate: {climate_type}")

    specific_climate = []
    for crop in crops:
        if crop["climate"].lower() == climate_type.lower():
            specific_climate.append(crop)

    res = []
    for climate_crop in specific_climate:
        if min_days <= climate_crop["days"] <= max_days:
            res.append(climate_crop)

    sorted_res = sorted(res, key=lambda x: x['days'])
    return sorted_res



def generate_summary(crops, name):
    crops_list = [f"{crop['name']} ({crop['days']} days, {crop['climate']}) - {crop['nutrition']}" for crop in crops]
    prompt = (
        f"Say 'Hey {name}' at the beginning.\n\n"
        "Here are some crops that grow well in the specified climate and time limit:\n\n"
        + "\n".join(crops_list)
        + "\n\n"
        "Please generate a friendly, thorough (3-4 sentences) summary that:\n"
        "- Highlights the nutritional and health benefits of these crops.\n"
        "- Explains how easy each crop is to grow.\n"
        "- Mentions which season each crop grows best in."
        "- Avoid listing all lettuce and simply state produce"
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
    print("Received from frontend:", data)  # Add this line for debugging

    name = data.get('name')
    dedication_level = data.get('timeCommitment')
    state = data.get('state')
    climate = data.get('climate')
    #nutrition_benefits = data.get('nutritional_benefits')
    
    print(f"New submission: {name}, {dedication_level}, {state}")

    recommendations = filter_crops(climate, dedication_level)
    print("Recommendations generated:", recommendations)

    summary = generate_summary(recommendations, name)
    
    # Return responses to frontend

    return jsonify({
        'message': 'Information received successfully!', 
        'recommendations' : recommendations,
        'LLM summary' : summary #AI generated summary of selected plants
    })

@app.route('/get_recipes', methods=['POST'])
def get_recipes():
    data = request.get_json()
    requested_crops = data.get('crops', [])

    matched_recipes = {}
    for crop in requested_crops:
        if crop in recipes_by_crop:
            matched_recipes[crop] = recipes_by_crop[crop]


    print("Debug: Sending the following recipes back to frontend:")
    for crop, recipes in matched_recipes.items():
        print(f"{crop}: {len(recipes)} recipes")
        for recipe in recipes:
            print(f"    {recipe['title']} -> {recipe['url']}")

    return jsonify(matched_recipes)

if __name__ == '__main__':
    load_recipes_from_csv()  #will immediately load recipes
    app.run(debug=True, port=5000)
