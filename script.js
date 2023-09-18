// Reference Essential HTML Elements
let recipeForm = document.querySelector('form');
let recipeName = document.querySelector('#recipeName');
let ingredients = document.querySelector('#ingredients');
let steps = document.querySelector('#method');
let recipeImage = document.querySelector('#recipeImage'); // Add the recipeImage selector
let displayArea = document.querySelector('#recipeList');

// Initialize recipes array by loading from local storage (if available)
let recipes = [];

if (localStorage.getItem('recipes')) {
    recipes = JSON.parse(localStorage.getItem('recipes'));
    // Display the loaded recipes on the page
    updateRecipeDisplay();
}

// Set Up the Event Listener
recipeForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Capture Input Values
    let enteredRecipeName = recipeName.value;
    let enteredIngredients = ingredients.value;
    let enteredSteps = steps.value;
    let enteredRecipeImage = recipeImage.value;

    // Store the Recipe
    let newRecipe = {
        name: enteredRecipeName,
        ingredients: enteredIngredients,
        steps: enteredSteps,
        image: enteredRecipeImage
    };

    recipes.push(newRecipe);

    // Save the recipes array to local storage
    localStorage.setItem('recipes', JSON.stringify(recipes));

    // Clear the Input Fields
    recipeName.value = '';
    ingredients.value = '';
    steps.value = '';
    recipeImage.value = '';

    // Display the Recipe
    displayRecipe(newRecipe);
});

// Rest of the code for displaying and deleting recipes remains the same
function displayRecipe(recipe) {
    // Create a div for the new recipe
    let recipeCard = document.createElement('div');
    recipeCard.classList.add('recipe-card'); // Add a class for styling

    // Create an img element for the recipe image (if provided)
    if (recipe.image) {
        let recipeImage = document.createElement('img');
        recipeImage.src = recipe.image;
        recipeImage.alt = recipe.name;
        recipeImage.style.maxWidth = '100%';
        recipeCard.appendChild(recipeImage);
    }

    // Create HTML content for the recipe card
    recipeCard.innerHTML += `
        <h3>${recipe.name}</h3>
        <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
        <p><strong>Steps:</strong> ${recipe.steps}</p>
    `;

    // Create a delete button for each recipe
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function() {
        deleteRecipe(recipe);
    };
    recipeCard.appendChild(deleteButton);

    // Add the new recipe div to the display area
    displayArea.appendChild(recipeCard);
}

function deleteRecipe(recipe) {
    let index = recipes.indexOf(recipe);

    if (index !== -1) {
        recipes.splice(index, 1);
        localStorage.setItem('recipes', JSON.stringify(recipes)); // Update local storage
        updateRecipeDisplay();
    }
}

function updateRecipeDisplay() {
    displayArea.innerHTML = '';
    recipes.forEach(function(recipe) {
        displayRecipe(recipe);
    });
}
