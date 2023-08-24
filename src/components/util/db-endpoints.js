export const sendRecipe = (recipe) => {
    const uri = import.meta.env.VITE_BASE_URI || 'http://localhost:5000'
    return fetch(`${uri}/send-recipe`, { // Enter your IP address here
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

export const getRecipe = (name) => {
    const uri = import.meta.env.VITE_BASE_URI || 'http://localhost:5000'
    return fetch(`${uri}/get-recipe/${name}`, { // Enter your IP address here
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