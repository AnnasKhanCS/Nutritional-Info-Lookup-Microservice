## Nutritional-Info-Lookup-Microservice

### Description
The Nutritional Info Lookup Microservice returns nutritional
information for food items by querying through the [USDA Food 
Data Central API](https://fdc.nal.usda.gov/food-search).

The calling program sends the following arguments:
| Parameter | Description | Required | Valid Values |
|---|---|---|---|
| food_name| Name of the food they wish to query| Yes | Any food name (ex. 'banana', 'chicken')|
| serving_amount| Serving size for the food item | Yes | Any positive number (ex. 100, 150, 0.5)|
|serving_unit| Unit of measurement for serving (currently only supports grams)| Yes | Only grams supported ex. 'g'|

The microservice pulls data from the USDA Food Data API, scales 
the nutrition values based on the serving size. Output field descriptions provided in Receive Data section

### How to Request Data
Send an HTTP Get request to api with the required query parameters: food_name, serving_amount, serving_unit

Example Request in Javascript:
```javascript
// Example Req for 200g banana
// food_name = banana
// serving_amount = 200
//serving_unit = 'g'

const foodName = 'banana';
const servingAmount = 200;
const servingUnit = 'g';

//Formulate the request URL with parameters embedded as query param
const url = `http://localhost:3001/api?food_name=${encodeURIComponent(foodName)}&serving_amount=${servingAmount}&serving_unit=${servingUnit}`;

//Send the GET request to microservice
const response = await fetch(url);

//Receive the JSON response
const data = await response.json();
```

### How to Receive Data
Returns a JSON object containing nutrition data for the requested food item and serving size. The output fields are described below:

| Output | Description | Example Value|
|---|---|---|
|food_name| The name of the food item returned from the USDA database| 'banana', 'chicken'|
|serving_amount| The serving amount provided in the request| Ex. 200|
|serving_unit| The measuring unit that was provided in the request|Ex."g"|
|calories|number of calories for the food item| Ex. 178|
|carbohydrates|grams of carbohydrates for the food item| Ex. 45.6|
|protein|grams protein for the food item| Ex. 2.2|
|fat|grams of fats for the food item| Ex. 0.6|


Example Response in Javascript:
Example Response for 200g banana

```json

{
 "food_name": "banana",
 "serving_amount": 200,
 "serving_unit": "g",
 "calories": 178,
 "carbohydrates": 45.6,
 "protein": 2.2,
 "fat": 0.6
}
```

Error Response

If a parameter is missing or invalid, the microservice returns 400 status with an error message in JSON as below:

```json
{
    "error": "Missing required parameters. Please provide food_name, serving_amount, and serving_unit"
}

```

### UML Sequence Diagram
<img width="1542" height="752" alt="image" src="https://github.com/user-attachments/assets/6eb504e4-c900-4103-a352-d0815f12df77" />

