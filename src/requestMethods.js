import axios from "axios";

const BASE_URL = "https://disease.sh/v3/covid-19/";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
