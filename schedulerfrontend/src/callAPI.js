import axios from "axios";
import { integrationApiBaseUrl } from "./enviroment";


export async function get(endPoint) {
    return axios.get(integrationApiBaseUrl + endPoint)
}

export async function post(endPoint, data) {
    return axios.post(integrationApiBaseUrl + endPoint, data)
}

export async function deleteCall(endPoint) {
    return axios.delete(integrationApiBaseUrl + endPoint)
}

export async function put(endPoint, data) {
    return axios.put(integrationApiBaseUrl + endPoint, data)
}
