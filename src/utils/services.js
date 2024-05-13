
import axios from "axios";
import { BASE_API_URL } from "./Constants";
import { store } from "../store/index"

const getStoreData = () => {
  const { accessToken } = store.getState().auth;
  return { accessToken };
};

const handleRequest = async (method, URL, body) => {
  const { accessToken } = getStoreData();
  try {
    const headers = {};
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }
    headers['Content-Type'] = 'application/json';
    const response = await method(BASE_API_URL + URL, body, { headers });
    return response.data
  } catch (error) {
    return error
  }
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


