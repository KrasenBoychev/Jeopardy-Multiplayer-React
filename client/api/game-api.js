import * as api from './requester.js';

const host = api.settings.host;

export async function getAllCategories() {
    return await api.get(host + '/play/categories/all'); 
}

export async function getCategory(categoryName) {
    return await api.get(host + '/play/category/' + categoryName); 
}

export async function getGameToken(username) {
    return await api.get(host + '/play/' + username); 
}

export async function getQuestions(categoriesIDs) {
    return await api.get(host + '/play/questions/' + categoriesIDs); 
}


