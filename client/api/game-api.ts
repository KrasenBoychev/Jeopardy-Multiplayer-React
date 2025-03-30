import * as api from "./requester.js";

const host = api.settings.host;

export async function getAllCategories() {
  return await api.get(host + "/play/categories/all");
}

export async function getCategory(categoryName: string) {
  return await api.get(host + "/play/category/" + categoryName);
}

export async function getGameToken(username: string) {
  return await api.get(host + "/play/" + username);
}

export async function getQuestions(categoriesIDs: any) {
  return await api.get(host + "/play/questions/" + categoriesIDs);
}

export async function recordPoints(userId: string, points: number) {
  const data = { points };
  return await api.put(host + "/play/result/" + userId, data);
}
