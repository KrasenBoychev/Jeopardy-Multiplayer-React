import { getAccessToken } from "../src/utils/authUtils";

export const settings = {
  host: "http://localhost:5000",
};

async function request(url: string, options: RequestInit) {
  try {
    const response = await fetch(url, options);

    if (response.status === 204) {
      return;
    }

    if (response.ok == false) {
      if (response.status == 401) {
        localStorage.removeItem("auth");
      }

      const error = await response.json();

      if (typeof error.message === "string") {
        throw new Error(error.message);
      } else {
        throw new Error(JSON.stringify(error.message));
      }
    }

    try {
      const data = await response.json();
      return data;
    } catch (err) {
      return response;
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
}

function getOptions(method: string, body?: any): RequestInit {
  const options: RequestInit = {
    method,
  };

  options.headers = {} as { [key: string]: string };

  const accessToken = getAccessToken();

  if (accessToken) {
    options.headers["X-Authorization"] = accessToken;
  }

  if (body) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(body);
  }

  return options;
}

export async function get(url: string) {
  return await request(url, getOptions("get"));
}

export async function post(url: string, data: any) {
  return await request(url, getOptions("post", data));
}

export async function put(url: string, data?: any) {
  return await request(url, getOptions("put", data));
}

export async function del(url: string) {
  return await request(url, getOptions("delete"));
}
