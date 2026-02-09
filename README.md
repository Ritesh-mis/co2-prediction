# Hourly CO₂ Emission Prediction for Steel Production  

## Project Overview  
This project focuses on predicting **hourly CO₂ emissions** generated in the steel industry, helping stakeholders understand and reduce their environmental impact. By accurately forecasting emissions, businesses can make data-driven decisions to improve sustainability in their production processes.  

## Business Problem  
Steel production is a significant source of CO₂ emissions, impacting climate change and sustainability goals. To mitigate this, companies need a clear, accurate measure of their emissions on an hourly basis. This project addresses this challenge by providing **hourly predictions of CO₂ emissions** based on various operational factors, supporting efforts to:  
- **Monitor emissions** and identify areas for improvement.  
- **Meet regulatory standards** by maintaining emission records.  
- **Enhance decision-making** for production schedules to reduce emissions.  

## Objectives  
- Build an accurate **machine learning model** to predict hourly CO₂ emissions.  
- Enable **visualization and analysis** of CO₂ emission trends over time.  
- Provide insights for **operational decisions** to reduce the CO₂ footprint.  

## Dataset  
The dataset contains key features related to **energy consumption and efficiency**, including:  
- `Usage_kWh`: Energy consumption in kilowatt-hours.  
- `Reactive Power (Lagging/Leading)`: Indicators of power quality and efficiency.  
- `NSM`: Seconds elapsed in the day (useful for time tracking).  
- `Power Factor`: A measure of energy efficiency.  

## Methodology  

### **Data Preprocessing**  
- Aggregated data to **hourly values** to align with business use cases.  
- Applied **Principal Component Analysis (PCA)** to reduce feature dimensions and visualize patterns.  

### **Initial Modeling**  
- Started with **PCA and Linear Regression** to understand relationships in the data.  
- Visualized data in lower dimensions and observed **non-linear patterns** in the emission data.  

### **Advanced Modeling**  
- Implemented **Polynomial Regression (degree 2)** to capture non-linear patterns, significantly improving prediction accuracy.  

### **Pipeline Creation**  
- Developed a pipeline with **PCA and polynomial regression** to streamline preprocessing and prediction.  

## Results  
- The model trained with **Polynomial Regression (degree 2)** provided **more accurate predictions** than linear regression.  
- **Dimensionality reduction with PCA** allowed us to visualize CO₂ emissions across different production settings, showing non-linear patterns in emissions over time.  

## Technologies Used  
- **Machine Learning**: Polynomial Regression (Degree 2), PCA for dimensionality reduction  
- **Backend**: Flask (Serving the model as an API)  
- **Containerization**: Docker (Packaging and deployment)  
- **Deployment**: Render (Hosting the API)  
- **Version Control**: Git & GitHub  

## Features  
✅ Predicts **hourly CO₂ emissions** based on operational factors  
✅ Serves predictions via a **Flask API**  
✅ **Containerized** using Docker for easy deployment  
✅ Hosted on **Render**, making the model accessible  

