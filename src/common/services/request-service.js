import axios from "axios";
import { getAccessToken } from "../../auth/services/auth-service";

const objectIsset = (data) => data && Object.values(data).length !== 0;

export const apiRequest = {
  baseUrl: "",
  token: "",
  timeout: 6000,

  setBaseUrl(baseUrl) {
    if (this.baseUrl.endsWith("/")) {
      throw new Error("Base URL should not end with a trailing slash.");
    }

    this.baseUrl = baseUrl;

    return this;
  },

  _generateHeaders(headers) {
    const baseHeader = {
      Authorization: `Bearer ${this.token}`,
    };

    if (!this.token && !headers) {
      return {};
    }

    if (this.token && headers) {
      return { ...headers, baseHeader };
    }

    if (this.token && !headers) {
      return baseHeader;
    }

    if (!this.token && headers) {
      return headers;
    }
  },

  setTimeout(timeoutInSeconds) {
    this.timeout = timeoutInSeconds * 1000;

    return this;
  },

  setAuthorizationToken(token) {
    this.token = token;

    return this;
  },

  useAuth() {
    return this.setAuthorizationToken(getAccessToken());
  },

  /**
   *
   * @param {string} url
   */
  _generateRequestUrl(url) {
    if (!this.baseUrl) {
      return url;
    }

    return url.startsWith("/")
      ? `${this.baseUrl}${url}`
      : `${this.baseUrl}/${url}`;
  },

  /**
   * Send API request.
   *
   * @param {{url:string, method: "POST" | "GET" | "PATCH" | "PUT" | "DELETE", data?: Record<string, any>, query?: Record<string, any>, headers?: Record<string, any>}} params
   * @returns {Promise<{status: boolean, message: string, data: any}>}
   */
  async send({ url, method, data, query, headers }) {
    const requestData = {
      method,
      url: this._generateRequestUrl(url),
    };

    if (this.timeout) {
      requestData["timeout"] = this.timeout;
    }

    if (objectIsset(data)) {
      requestData["data"] = data;
    }

    if (objectIsset(query)) {
      
      requestData["params"] = query;
    }
    const generatedHeaders = this._generateHeaders(headers);

    if (objectIsset(generatedHeaders)) {
      requestData["headers"] = generatedHeaders;
    }

    console.log(requestData);
    try {
      const response = await axios(requestData);

      return {
        status: true,
        message: response.data.message,
        data: response.data,
      };
    } catch (error) {
      return {
        status: false,
        message: error.response ? error.response.data.message : "Unable to complete request.",
        data: error.response ? error.response.data : error.message,
      };
    }
  },
};
