import axios from "axios";

export const fetcher = axios.create({
  baseURL: "https://restcountries.com/v3.1",
});
