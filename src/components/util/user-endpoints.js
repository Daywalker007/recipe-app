export const getUser = () => {
    const url = `${import.meta.env.VITE_API_URL}/auth`
    return fetch(url, {
        headers: {
            "Content-Type": "application/json",
        },
        credentials:"include",
        method:"GET",
        mode:"cors"
    })
    .then((response) => {
        return response.json()
    }).catch(error => {
        console.error('Error from getUser:', error);
        return error
    });
}