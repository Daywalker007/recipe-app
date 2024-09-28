export const getUser = () => {
    const url = `${import.meta.env.VITE_API_URL}/auth`
    return fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": window.location.href
        },
        credentials:"include",
        method:"GET",
        mode:"cors"
    })
    .then((response) => {
        return response.json()
    }).catch(error => {
        console.warn('Unable to get user data from server:', error);
        return error
    });
}