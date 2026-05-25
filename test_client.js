async function testNutritionalLookup() {
    const foodName = "Bananas, raw";
    const servingAmount = 200;
    const servingUnit = "g";

    const url = `http://localhost:3001/api?food_name=${encodeURIComponent(foodName)}&serving_amount=${servingAmount}&serving_unit=${servingUnit}`;

    console.log('Sending request to:', url);

    const response = await fetch(url);
    const data = await response.json();
    
    console.log('Response from server:', data);
}

testNutritionalLookup();