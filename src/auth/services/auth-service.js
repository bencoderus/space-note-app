import config from "../../common/config";
import { apiRequest } from "../../common/services/request-service";

const AUTH_TOKEN_KEY = "authToken";
const AUTH_USER_KEY = "authUser";

export const PASSWORD_RESET_ROUTE = `${config.appUrl}/reset-password`;

export const attemptLogin = async (data) => {
  try {
    const response = await apiRequest.post(`auth/login`, data);

    return {
      status: true,
      statusCode: response.status,
      data: response.data,
    };
  } catch (error) {
    return {
      status: false,
      statusCode: error.response ? error.response.status : 500,
      data: error.response ? error.response.data : null,
    };
  }
};

export const forgotPassword = async (data) => {
  try {
    const response = await apiRequest.post(`auth/forgot-password`, data);

    return {
      status: true,
      statusCode: response.status,
      data: response.data,
    };
  } catch (error) {
    return {
      status: false,
      statusCode: error.response ? error.response.status : 500,
      data: error.response ? error.response.data : null,
    };
  }
};

export const resetPassword = async (data) => {
  try {
    const response = await apiRequest.post(
      `auth/reset-password`,
      {
        password: data.password,
      },
      {
        headers: {
          Authorization: `Bearer ${data.accessToken}`,
        },
      }
    );

    return {
      status: true,
      statusCode: response.status,
      data: response.data,
    };
  } catch (error) {
    return {
      status: false,
      statusCode: error.response ? error.response.status : 500,
      data: error.response ? error.response.data : null,
    };
  }
};

export const register = async (data) => {
  try {
    const response = await apiRequest.post(`auth/register`, data);

    return {
      status: true,
      statusCode: response.status,
      data: response.data,
    };
  } catch (error) {
    return {
      status: false,
      statusCode: error.response ? error.response.status : 500,
      data: error.response ? error.response.data : null,
    };
  }
};

export const loginUser = (data) => {
  localStorage.setItem(
    AUTH_TOKEN_KEY,
    JSON.stringify({
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresAt: data.expires_at,
    })
  );

  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(data.user));
};

export const getAccessToken = () => {
  const authToken = JSON.parse(localStorage.getItem(AUTH_TOKEN_KEY) || "");

  return authToken?.accessToken;
};

export const signOutUser = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
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
    user: JSON.parse(localStorage.getItem(AUTH_USER_KEY) || ""),
  };
};
