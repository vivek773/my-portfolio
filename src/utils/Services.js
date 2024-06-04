import axios from "axios";
import { BASE_API_URL } from "./Constants";
import { store } from "../store/store";

const getStoreData = () => {
  const { webAccessToken, tenant_id, user_id } = store.getState().auth;
  return { webAccessToken, tenant_id, user_id };
};

const encodeQueryString = (params) => {
  const keys = Object.keys(params);
  const queryString = keys
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    )
    .join("&");
  return keys.length ? `?${queryString}` : "";
};

const handleRequest = async (method, URL, body) => {
  const { webAccessToken, tenant_id, user_id } = getStoreData();
  try {
    const headers = {};
    if (webAccessToken && tenant_id && user_id) {
      headers["Authorization"] = `Bearer ${webAccessToken}`;
      headers["tenant_id"] = tenant_id;
      headers["user_id"] = user_id;
    }
    // headers["Content-Type"] = "application/json";
    const response = await method(
      BASE_API_URL + URL,
      method === axios.get ? { headers } : body,
      { headers }
    );
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const fetchGETRequest = async (URL, body = {}) => {
  return handleRequest(axios.get, URL + encodeQueryString(body));
};

export const fetchPOSTRequest = async (URL, body = {}) => {
  return handleRequest(axios.post, URL, body);
};

export const fetchPUTRequest = async (URL, body = {}) => {
  return handleRequest(axios.put, URL, body);
};

export const fetchDELETERequest = async (URL, body = {}) => {
  return handleRequest(axios.delete, URL, body);
};

export const pdfDownloadRequest = async (URL, body = {}) => {
  try {
    const { webAccessToken, tenant_id, user_id } = getStoreData();

    const response = await axios({
      url: BASE_API_URL + URL,
      method: "GET",
      responseType: "blob",
      headers: {
        "Content-Type": "application/jpeg",
        Authorization: `Bearer ${webAccessToken}`,
        tenant_id: tenant_id,
        user_id: user_id
      },
    });

    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
};
