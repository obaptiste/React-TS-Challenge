import fetch from "node-fetch";
import { RequestInit } from 'node-fetch';
import { Token } from "typescript";


const formatDate = (date: Date) =>
  `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')} ${String(
    date.getSeconds(),
  ).padStart(2, '0')}.${String(date.getMilliseconds()).padStart(3, '0')}`

export type Json<T> = 
    T extends Date ? unknown :
    T extends Array<(infer U)> ? JsonArray<U> :
    T extends object ? { [K in keyof T]: Json<T[K]> } :
    T;

 interface JsonArray<T> extends Array<Json<T>> { }

 type SpotifyData = {
    id: string
    name:string
    value:unknown
}

const client_id='29b3254a2def44908dd164cf04831935'
const client_secret='28c2bddf7d734530a75a0d66ed5210b2'

type JSONResponse = {
   data?: {
    song: Omit<SpotifyData, 'fetchedAt'>
   } 
   errors?:Array<{message:string}>
}
async function request<TResponse>(url:string, config:RequestInit = {}): Promise<TResponse>  {
    return fetch(url, config).then((response) => response.json()).then((data) => data as TResponse)
  
}

let url = "https://accounts.spotify.com/api/token";
let auth = "Basic " + Buffer.from(client_id + ":" + client_secret).toString("base64");
let headers = {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    "Authorization": auth
}


const token:Token = await request <Token>(url, {headers}).then(token => {
    localStorage.setItem("auth", response.formData.toString());
    hasToken: true
    token: response.formData
})>

  

    const response:Response = await window.fetch(url, {  
        method: 'POST',
        headers: headers,
        body: JSON.stringify({grant_type:'client_credentials'})
    });


    try {
    const {data, errors}: JSONResponse = await response.json()
    if(response.ok) {
        const song = data?.song
        if(song) {
            return {song, {fetchedAt: formatDate(new Date())}}
                } else {
            return Promise.reject(new Error('No songs found'))
        }

    
}catch (error) {
    console.error(error)
}


