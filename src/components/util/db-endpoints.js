export const sendRecipe = (recipe) => {
    const uri = import.meta.env.VITE_API_URL
    return fetch(`${uri}/send-recipe`, { 
        headers: {
            "Content-Type": "application/json",
        },
        method: 'POST',
        // DONT FOGET THIS GOD FORSAKEN LINE
        credentials: 'include',
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

export const updateRecipe = (id, recipe) => {
    const uri = import.meta.env.VITE_API_URL
    return fetch(`${uri}/send-recipe/${id}`, { 
        headers: {
            "Content-Type": "application/json",
        },
        method: 'POST',
        // DONT FOGET THIS GOD FORSAKEN LINE
        credentials: 'include',
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
    const uri = import.meta.env.VITE_API_URL
    return fetch(`${uri}/get-recipe-name/${name}`, { 
        headers: {
            "Content-Type": "application/json",
        },
        method: 'GET',
        // DONT FOGET THIS GOD FORSAKEN LINE
        credentials: 'include',
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
    const uri = import.meta.env.VITE_API_URL
    return fetch(`${uri}/get-recipe/${id}`, { 
        headers: {
            "Content-Type": "application/json",
        },
        method: 'GET',
        // DONT FOGET THIS GOD FORSAKEN LINE
        credentials: 'include',
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

export const getRecipeByUser = () => {
    // const uri = import.meta.env.VITE_API_URL
    return fetch(`${import.meta.env.VITE_API_URL}/get-recipe-owner`, { 
        headers: {
            "Content-Type": "application/json",
        },
        method: 'GET',
        // DONT FOGET THIS GOD FORSAKEN LINE
        credentials: 'include',
    })
    .then(response => response.json())
    .then(response => {
        return response.data
    })
    .catch(error => {
        console.error('Error from frontend:', error);
        return 'Issue with server, please try again'
    });
}

export const getAllRecipes = () => {
    const uri = import.meta.env.VITE_API_URL
    return fetch(`${uri}/get-recipes`, { 
        headers: {
            "Content-Type": "application/json",
        },
        method: 'GET',
        // DONT FOGET THIS GOD FORSAKEN LINE
        credentials: 'include'
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