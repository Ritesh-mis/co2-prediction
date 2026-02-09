from flask import Flask, render_template, request, jsonify
import pandas as pd
import cloudpickle
import os

app = Flask(__name__)

# Load the pre-trained pipeline
with open('poly_regression_pipeline.pkl', 'rb') as f:
    pipeline = cloudpickle.load(f)

# Define the function to make predictions
def predict(input_data):
    # Convert the input data to a DataFrame
    input_df = pd.DataFrame([input_data], columns=[
        'Usage_kWh',
        'Lagging_Current_Reactive.Power_kVarh',
        'Leading_Current_Reactive_Power_kVarh',
        'Lagging_Current_Power_Factor',
        'NSM',
    ])
    
    # Ensure correct data types for numeric columns
    numeric_cols = [
        'Usage_kWh', 
        'Lagging_Current_Reactive.Power_kVarh', 
        'Leading_Current_Reactive_Power_kVarh', 
        'Lagging_Current_Power_Factor', 
        'NSM'
    ]
    
    input_df[numeric_cols] = input_df[numeric_cols].astype(float)
    
    # Predict using the pipeline
    prediction = pipeline.predict(input_df)
    return prediction[0]

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def make_prediction():
    try:
        # Get data from form
        usage_kwh = float(request.form.get('usage_kwh', 0))
        lagging_reactive = float(request.form.get('lagging_reactive', 0))
        leading_reactive = float(request.form.get('leading_reactive', 0))
        power_factor = float(request.form.get('power_factor', 0))
        nsm = float(request.form.get('nsm', 0))
        
        # Validate inputs
        if usage_kwh <= 0 or nsm <= 0:
            return jsonify({
                'error': True,
                'message': 'Please enter valid values for Usage_kWh and NSM. They cannot be zero or negative!'
            })
        
        # Create input dictionary
        user_input = {
            'Usage_kWh': usage_kwh, 
            'Lagging_Current_Reactive.Power_kVarh': lagging_reactive, 
            'Leading_Current_Reactive_Power_kVarh': leading_reactive, 
            'Lagging_Current_Power_Factor': power_factor, 
            'NSM': nsm
        }
        
        # Make prediction
        prediction = predict(user_input)
        prediction_hourly = prediction * 4  # Scale to hourly CO2 emission
        
        # Calculate tree equivalents
        co2_per_tree_min = 0.015  # 15 kg of CO2 per tree per year
        co2_per_tree_max = 0.030  # 30 kg of CO2 per tree per year
        min_trees = prediction_hourly / co2_per_tree_max
        max_trees = prediction_hourly / co2_per_tree_min
        
        # Calculate equivalents
        car_km = prediction_hourly * 888
        airplane_km = prediction_hourly * 160
        
        # Return results as JSON
        return jsonify({
            'error': False,
            'prediction': round(prediction_hourly, 2),
            'min_trees': int(min_trees),
            'max_trees': int(max_trees),
            'car_km': round(car_km, 1),
            'airplane_km': round(airplane_km, 1)
        })
        
    except Exception as e:
        return jsonify({
            'error': True,
            'message': f'Prediction error: {str(e)}'
        })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 10000))
    app.run(host='0.0.0.0', port=port, debug=False)
