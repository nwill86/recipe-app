import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import RecipeExerpt from "./components/RecipeExcerpt";
import RecipeFull from "./components/RecipeFull";
import NewRecipeForm from "./components/NewRecipeForm";
import "./App.css";


function App() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [newRecipe, setNewRecipe] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    servings: 1, // conservative default
    description: "",
    image_url: "https://images.pexels.com/photos/9986228/pexels-photo-9986228.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" //default
  });
  const [showNewRecipeForm, setShowNewRecipeForm] = useState(false);


  useEffect(() => {
    const fetchAllRecipes = async () => {
      try {
        const response = await fetch("/api/recipes");
        if (response.ok) {
          const data = await response.json();
          setRecipes(data);
        } else {
          console.log("Oops - could not fetch recipes!")
        }
      } catch (e) {
        console.error("An error occured during the request", e);
        console.log("An unexpected error occured. Please try again later.")
      }
    };
    fetchAllRecipes();
  }, []);

  const handleSelectRecipe = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleUnselectRecipe = () => {
    setSelectedRecipe(null);
  };


  const hideRecipeForm = () => {
    setShowNewRecipeForm(false);
  };

  const showRecipeForm = () => {
    setShowNewRecipeForm(true);
    setSelectedRecipe(null);
  };

  const onUpdateForm = (e) => {
    const { name, value } = e.target;
    setNewRecipe({ ...newRecipe, [name]: value });
  };

  return (
    <div className='recipe-app'>
      <Header showRecipeForm={showRecipeForm} />
      {showNewRecipeForm && <NewRecipeForm
          newRecipe={newRecipe}
          hideRecipeForm={hideRecipeForm} 
          onUpdateForm={onUpdateForm}
          />
      }

      {selectedRecipe && (
        <RecipeFull selectedRecipe={selectedRecipe}
          handleUnselectRecipe={handleUnselectRecipe} />
      )}
      {!selectedRecipe && (
        <div className="recipe-list">
          {recipes.map(recipe => (
            <RecipeExerpt key={recipe.id}
              recipe={recipe}
              handleSelectRecipe={handleSelectRecipe} />
          ))}
        </div>
      )}
    </div>

  );
};

export default App;
