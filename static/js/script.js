document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('prediction-form');
    const resultsDiv = document.getElementById('results');
    
    // Handle form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Get form elements
        const usageKwh = document.getElementById('usage_kwh').value;
        const laggingReactive = document.getElementById('lagging_reactive').value;
        const leadingReactive = document.getElementById('leading_reactive').value;
        const powerFactor = document.getElementById('power_factor').value;
        const nsm = document.getElementById('nsm').value;
        
        // Validate all fields are filled
        const emptyFields = [];
        
        if (!usageKwh) emptyFields.push('Usage kWh');
        if (!laggingReactive) emptyFields.push('Lagging Current Reactive Power');
        if (!leadingReactive) emptyFields.push('Leading Current Reactive Power');
        if (!powerFactor) emptyFields.push('Lagging Current Power Factor');
        if (!nsm) emptyFields.push('NSM');
        
        // Show error message if any fields are empty
        if (emptyFields.length > 0) {
            alert(`The following fields cannot be empty: ${emptyFields.join(', ')}`);
            return;
        }
        
        // Validate numeric values
        if (parseFloat(usageKwh) <= 0) {
            alert('Usage kWh must be greater than zero');
            return;
        }
        
        if (parseFloat(nsm) <= 0) {
            alert('NSM must be greater than zero');
            return;
        }
        
        // Get form data
        const formData = new FormData(form);
        
        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Predicting...';
        submitButton.disabled = true;
        
        // Make AJAX request to server
        fetch('/predict', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // Reset button state
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            
            if (data.error) {
                // Show error message
                alert(data.message);
                return;
            }
            
            // Update results
            document.getElementById('prediction-value').textContent = `${data.prediction} tons`;
            document.getElementById('min-trees').textContent = data.min_trees;
            document.getElementById('max-trees').textContent = data.max_trees;
            document.getElementById('car-km').textContent = data.car_km;
            document.getElementById('airplane-km').textContent = data.airplane_km;
            
            // Show results
            resultsDiv.style.display = 'block';
            
            // Scroll to results
            resultsDiv.scrollIntoView({ behavior: 'smooth' });
        })
        .catch(error => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            alert('An error occurred. Please try again.');
            console.error('Error:', error);
        });
    });

    // Only set default values if fields are empty
    if (!document.getElementById('usage_kwh').value) {
        document.getElementById('usage_kwh').value = 120;
    }
    if (!document.getElementById('lagging_reactive').value) {
        document.getElementById('lagging_reactive').value = 60;
    }
    if (!document.getElementById('leading_reactive').value) {
        document.getElementById('leading_reactive').value = 16;
    }
    if (!document.getElementById('power_factor').value) {
        document.getElementById('power_factor').value = 80;
    }
    if (!document.getElementById('nsm').value) {
        document.getElementById('nsm').value = 42000;
    }
});