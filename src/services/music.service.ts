import axios, { Axios } from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test";

export const getPublicContent = () => {
    return axios.get(API_URL + "all");
};

export const getMusicBoard = () => {
    return axios.get(API_URL + "music", { headers: authHeader() });
}