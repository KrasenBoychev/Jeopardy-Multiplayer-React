import * as api from './requester.js';

const host = api.settings.host;

export async function createCategory(data) {
    return await api.post(host + '/create/category', data); 
}

export async function createQuestion(data) {
    return await api.post(host + '/create/question', data); 
}