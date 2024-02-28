import React from "react";

const RecipeExerpt = ({ recipe }) => {
    return (
        <article className="recipe-card">
            <figure>
            <img src={recipe.image_url} alt={recipe.tile} />
            </figure>
            <h2>{recipe.title}</h2>
            <p className="flex-spacing">Description: {recipe.description}</p>
            <button>View</button>
            </article>
    );
};



export default RecipeExerpt;