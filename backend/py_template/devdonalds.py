from dataclasses import dataclass
from typing import List, Dict, Union
from flask import Flask, request, jsonify
import re

# ==== Type Definitions, feel free to add or modify ===========================
@dataclass
class CookbookEntry:
	name: str

@dataclass
class RequiredItem():
	name: str
	quantity: int

@dataclass
class Recipe(CookbookEntry):
	required_items: List[RequiredItem]

@dataclass
class Ingredient(CookbookEntry):
	cook_time: int


# =============================================================================
# ==== HTTP Endpoint Stubs ====================================================
# =============================================================================
app = Flask(__name__)

# Store your recipes here!
cookbook = {}

# Task 1 helper (don't touch)
@app.route("/parse", methods=['POST'])
def parse():
	data = request.get_json()
	recipe_name = data.get('input', '')
	parsed_name = parse_handwriting(recipe_name)
	if parsed_name is None:
		return 'Invalid recipe name', 400
	return jsonify({'msg': parsed_name}), 200

# [TASK 1] ====================================================================
# Takes in a recipeName and returns it in a form that 
def parse_handwriting(recipeName: str) -> Union[str | None]:
    recipeName = recipeName.replace('-', ' ')
    recipeName = recipeName.replace('_', ' ')
    removeIllegal = ''.join(char for char in recipeName if char.isalpha() or char.isspace())
    capitalizedName = ' '.join(word.capitalize() for word in removeIllegal.split())
    finalName = ' '.join(capitalizedName.split())
    if len(finalName) == 0:
        return None
    return finalName

# [TASK 2] ====================================================================
# Endpoint that adds a CookbookEntry to your magical cookbook
@app.route('/entry', methods=['POST'])
def create_entry():
	data = request.get_json()
	item_type = data['type']
	item_name = data['name']
	if item_name in cookbook:
		return 'entry name not unique', 400
	if item_type == 'recipe':
		seen_items = set()
		required_items = data['requiredItems']
		for item in required_items:
			if item['name'] in seen_items:
				return 'requiredItems can only have one element per name', 400
			seen_items.add(item['name'])
        
		cookbook[item_name] = Recipe(
            item_name,
            [RequiredItem(item['name'], item['quantity']) for item in required_items]
        )
	elif item_type == 'ingredient':
		cook_time = data['cookTime']
		if cook_time < 0:
			return 'cook time must be equal to or greater than 0', 400
		cookbook[item_name] = Ingredient(item_name, cook_time)
	else:
		return 'invalid item type', 400
		
	return '', 200

# Endpoint that returns a summary of a recipe that corresponds to a query name
@app.route('/summary', methods=['GET'])
def summary():
	recipe_name = request.args.get('name')

	if recipe_name not in cookbook:
		return 'recipe not found', 400
	if not isinstance(cookbook[recipe_name], Recipe):
		return 'name is not a recipe name', 400

	ingredients = {}
	msg, status = get_ingredients(ingredients, cookbook[recipe_name].required_items)
	if status != 200:
		return msg, status
	recipe_summary =  {
		'type': 'recipe',
		'name': recipe_name,
		'ingredients': [
            {'name': name, 'quantity': quantity}
            for name, quantity in ingredients.items()
        ]
	}
	return recipe_summary, 200

def get_ingredients(ingredients, required_ingredient):
	for ingredient in required_ingredient:
		if ingredient.name not in cookbook:
			return 'item not found in cookbookd', 400
		if isinstance(cookbook[ingredient.name], Recipe):
			msg, status = get_ingredients(ingredients, ingredient.requiredItems)
			if status != 200:
				return msg, status
		else:
			ingredients[ingredient.name] = ingredients.get(ingredient.name, 0) + ingredient.quantity
	return None, 200

# =============================================================================
# ==== DO NOT TOUCH ===========================================================
# =============================================================================

if __name__ == '__main__':
	app.run(debug=True, port=8080)
