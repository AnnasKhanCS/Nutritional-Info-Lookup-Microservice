## Nutritional-Info-Lookup-Microservice

### Description
The Nutritional Info Lookup Microservice returns nutritional
information for food items by querying through the [USDA Food 
Data Central API](https://fdc.nal.usda.gov/food-search).

The calling program sends the following arguments:
* food_name:  Name of the food they wish to query
* serving_amount : Serving size for the food item
* serving_unit : Unit of measurement for serving (currently 
only supports grams)

The microservice pulls data from the USDA Food Data API, scales 
the nutrition values based on the serving size and outputs the 
following:
* calories : number of calories for the food item
* carbohydrates: number of carbohydrates for the food item
* protein : number of protein for the food item
* fat : number of fats for the food item

### How to Request Data
Send an HTTP Get request to api with the required query parameters: food_name, serving_amount, serving_unit

Example Request in Javascript:
```
// Example Req for 200g banana
const foodName = 'banana';
const servingAmount = 200;
const servingUnit = 'g';

const url = `http://localhost:3001/api?food_name=${encodeURIComponent(foodName)}&serving_amount=${servingAmount}&serving_unit=${servingUnit}`;

const response = await fetch(url);
const data = await response.json();
```

### How to Receive Data
Returns a JSON object containing nutrition data for the requested food item and serving size.

Example Response in Javascript:
```
// Example Res for 200g banana
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

### UML Sequence Diagram
<img width="1542" height="752" alt="image" src="https://github.com/user-attachments/assets/6eb504e4-c900-4103-a352-d0815f12df77" />

