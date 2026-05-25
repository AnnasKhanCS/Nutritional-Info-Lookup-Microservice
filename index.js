const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3001;

const API_KEY = "ZEycIZ4SdTypG9F20aR6ipep0vIPu2jbHgYjiwh2";

app.get('/api', async(req, res) => {
    const foodName = req.query.food_name;
    const servingAmount = parseFloat(req.query.serving_amount);
    const servingUnit = req.query.serving_unit;

    // error handling for missing parameters
    if (!foodName || isNaN(servingAmount) || !servingUnit) {
        return res.status(400).json({ 
            error: 'Missing required parameters. Please provide food_name, serving_amount, and serving_unit.'
        });
    }

    // error handling for invalid serving unit (not in grams)
    if (servingUnit.toLowerCase() !== 'g') {
        return res.status(400).json({ 
            error: 'Invalid serving unit. Only "grams" is supported.'
        });
    }

    try {
        // Search foodName in USDA database
        const response = await axios.post(
            `https://api.nal.usda.gov/fdc/v1/foods/search?query=${foodName}&api_key=${API_KEY}`,
            {
                query: foodName,
                pageSize: 1
            }
        );
        // error handling for no results found
        if (response.data.foods.length === 0 || !response.data.foods) {
            return res.status(404).json({ 
                error: 'Food item not found in the database.'
            });
        };

    const food = response.data.foods[0];
    const nutrients = food.foodNutrients;
    let calories = 0;
    let carbohydrates = 0;
    let protein = 0;
    let fat = 0;

    nutrients.forEach(nutrient => {
        if (nutrient.nutrientName === 'Energy') {
            calories = nutrient.value;
        }
        if (nutrient.nutrientName === 'Carbohydrate, by difference') {
            carbohydrates = nutrient.value;
        }
        if (nutrient.nutrientName === 'Protein') {
            protein = nutrient.value;
        }
        if (nutrient.nutrientName === 'Total lipid (fat)') {
            fat = nutrient.value;
        }
    });

    // Calculate nutritional values based on serving amount
    const factor = servingAmount / 100; // USDA data is per 100g
    
    calories *= factor;
    carbohydrates *= factor;
    protein *= factor;
    fat *= factor;

    const result = {
        food_name: food.description,
        serving_amount: servingAmount,
        serving_unit: servingUnit,
        calories: calories.toFixed(1),
        carbohydrates: carbohydrates.toFixed(1),
        protein: protein.toFixed(1),
        fat: fat.toFixed(1)
    };
    
    res.json(result);
} 

catch (error) {
    console.error('Error fetching data from USDA API:', error);
    res.status(500).json({ 
        error: 'An error occurred while fetching data from the USDA API. Please try again later.'
    }); 

}

});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});