import api from "./apiClient";

function loginUser(data){
    return api.post('users/login', data);
}
function registerUser(data){
    return api.post('users/register', data);
}
function currentUser(){
    return api.get('users/current')
        .then(response => {
            return response;
        })
        .catch(error => {
            throw error;
        });
}

function changePassword(data){
    return api.post('users/change-password', data);
}

export default { loginUser, registerUser, currentUser, changePassword};
