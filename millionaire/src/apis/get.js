import BASE_URL from "../constants/URL";

const getAPI= async(path) =>{
    const response = await fetch(`${BASE_URL}/${path}`, {
        headers: {
            "Accept": "application/json",
            "ngrok-skip-browser-warning": true,
        },
        method: "GET",
    });
    // const response = await fetch("../../public/data/authentication.json");
    return response.json();
}

export {getAPI};