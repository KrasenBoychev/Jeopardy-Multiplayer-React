import * as api from "./requester.js";

const host = api.settings.host;

export async function login(email: string, password: string) {
  const result = await api.post(host + "/auth/login", {
    email,
    password,
  });

  return result;
}

export async function register(
  email: string,
  username: string,
  password: string
) {
  const result = await api.post(host + "/auth/register", {
    email,
    username,
    password,
  });

  return result;
}

export async function logout() {
  const result = await api.get(host + "/auth/logout");

  return result;
}
