import axios from "axios";

const API = axios.create({
  baseURL: 'http://localhost:5000/api/'
});

export const API_URL = 'http://localhost:5000/api/'

// Set Authorization Token Header
export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = token;
  } else {
    delete API.defaults.headers.commin["Authorization"];
  }
};