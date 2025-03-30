export const getAccessToken = (): string => {
  const authJSON = localStorage.getItem("auth");

  if (!authJSON) {
    return "";
  }

  const authData = JSON.parse(authJSON);

  return authData?.accessToken;
};
