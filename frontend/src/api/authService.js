import api from "./apiClient";

function loginUser(data){
    return api.post('users/login', data);
}
function registerUser(data){
    return api.post('users/register', data);
}
function currentUser(){
    console.log("Making currentUser API call...");
    return api.get('users/current')
        .then(response => {
            console.log("Current user API response:", response.data);
            return response;
        })
        .catch(error => {
            console.error("Current user API error:", error);
            throw error;
        });
}

export default { loginUser, registerUser, currentUser};