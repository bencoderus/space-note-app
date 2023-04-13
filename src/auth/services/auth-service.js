import config from "../../common/config";
import { apiRequest } from "../../common/services/request-service";

const AUTH_TOKEN_KEY = "authToken";
const AUTH_USER_KEY = "authUser";

export const PASSWORD_RESET_ROUTE = `${config.appUrl}/reset-password`;

const authClient = () => {
  return apiRequest.setBaseUrl(config.apiUrl);
};

export const attemptLogin = async (data) => {
  return authClient().send({
    url: "auth/login",
    method: "POST",
    data,
  });
};

export const forgotPassword = async (data) => {
  return authClient().send({
    url: "auth/forgot-password",
    method: "POST",
    data,
  });
};

export const resetPassword = async (data) => {
  return authClient().send({
    url: "auth/reset-password",
    method: "POST",
    headers: {
      Authorization: `Bearer ${data.accessToken}`,
    },
    data,
  });
};

export const register = async (data) => {
  return authClient().send({
    url: "auth/register",
    method: "POST",
    data,
  });
};

export const loginUser = (data, auth) => {
  const token = {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresAt: data.expires_at,
  };
  const user = data.user;

  localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(token));
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));

  auth.setAuth({ user, token });
};

export const getAccessToken = () => {
  const authToken = JSON.parse(localStorage.getItem(AUTH_TOKEN_KEY) || "{}");

  return authToken?.accessToken;
};

export const signOutUser = (auth) => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);

  auth.setAuth({
    user: null,
    token: null
  })
};

export const getUserData = () => {
  const authToken = localStorage.getItem(AUTH_TOKEN_KEY) || "{}";
  const authUser = localStorage.getItem(AUTH_USER_KEY) || "{}";

  return {
    token: JSON.parse(authToken),
    user: JSON.parse(authUser),
  };
};

export const isAuthenticated = (token) => {
  if (!token || (token && !token.expiresAt)) {
    return false;
  }

  const now = Math.round(Date.now() / 1000);

  if (now > token?.expiresAt) {
    return false;
  }

  return true;
};

export const getAuthData = () => {
  const authToken = localStorage.getItem(AUTH_TOKEN_KEY);

  if (!authToken) {
    return {
      isAuthenticated: false,
      user: null,
    };
  }

  const authTokenParsed = JSON.parse(authToken);

  const now = Math.round(Date.now() / 1000);

  if (now > authTokenParsed.expiresAt) {
    return {
      isAuthenticated: false,
      user: null,
    };
  }

  return {
    isAuthenticated: true,
    user: JSON.parse(localStorage.getItem(AUTH_USER_KEY) || "{}"),
  };
};
