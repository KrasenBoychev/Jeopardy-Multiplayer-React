import * as api from './requester.js';

const host = api.settings.host;

export async function login(email, password) {
    const result = await api.post(host + '/users/login', {
      email,
      password,
    });
  
    return result;
  }
  
  export async function register(email, username, password) {
    const result = await api.post(host + '/users/register', {
      email,
      username,
      password,
    });
  
    return result;
  }
  
  export async function logout() {
    const result = await api.get(host + '/users/logout');
  
    return result;
  }