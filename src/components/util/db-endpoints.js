import { data } from "autoprefixer";

export const sendRecipe = (recipe) => {
    const uri = import.meta.env.VITE_BASE_URI || 'http://localhost:5000'
    return fetch(`${uri}/send-recipe`, { 
        headers: {
            "Content-Type": "application/json",
        },
        method: 'POST',
        body: JSON.stringify(recipe) // body data type must match "Content-Type" header
    })
    .then(response => {
        return response
    })
    .catch(error => {
        console.error('Error from frontend:', error);
        return 'Issue with server, please try again'
    });
}

// TODO: Eval ingredients and instructions
export const getRecipeByName = (name) => {
    const uri = import.meta.env.VITE_BASE_URI || 'http://localhost:5000'
    return fetch(`${uri}/get-recipe-name/${name}`, { 
        headers: {
            "Content-Type": "application/json",
        },
        method: 'GET',
    })
    .then(response => response.json())
    .then(response => {
        return response.data[0]
    })
    .catch(error => {
        console.error('Error from frontend:', error);
        return 'Issue with server, please try again'
    });
}

// TODO: Eval ingredients and instructions
export const getRecipe = (id) => {
    const uri = import.meta.env.VITE_BASE_URI || 'http://localhost:5000'
    return fetch(`${uri}/get-recipe/${id}`, { 
        headers: {
            "Content-Type": "application/json",
        },
        method: 'GET',
    })
    .then(response => response.json())
    .then(response => {
        return response.data[0]
    })
    .catch(error => {
        console.error('Error from frontend:', error);
        return 'Issue with server, please try again'
    });
}

export const getAllRecipes = () => {
    const uri = import.meta.env.VITE_BASE_URI || 'http://localhost:5000'
    return fetch(`${uri}/get-recipes`, { 
        headers: {
            "Content-Type": "application/json",
        },
        method: 'GET',
    })
    .then(response => response.json())
    .then(({data}) => {
        return data
    })
    .catch(error => {
        console.error('Error from frontend:', error);
        return 'Issue with server, please try again'
    });
}