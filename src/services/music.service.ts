import axios, { Axios } from "axios";
import authHeader from "./auth-header";

const API_URL = "https://api.spotify.com/v1/me/";

export const getPublicContent = async () => {
    return axios.get(API_URL + "all");
};

export const getMusicBoard = async () => {
    return axios.get(API_URL + "music", { headers: authHeader() });
}

export const getPlaylists = async () => {
    return axios.get(API_URL + "/browse/featured-playlists", { headers: authHeader() });
}