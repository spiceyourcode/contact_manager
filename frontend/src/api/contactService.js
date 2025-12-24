import api from './apiClient';

function getContacts(){
    return api.get('/contacts');
}
function getContact(id){
    return api.get(`/contacts/${id}`);
}
function createContact(data){
    return api.post('/contacts', data);
}
function updateContact(id, data){
    return api.put(`/contacts/{id}`, data)
}
function deleteContact(id){
    return api.delete(`/contact/{id}`)
}
export default {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
}