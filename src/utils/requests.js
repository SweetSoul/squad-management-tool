import axios from "axios"
import { getToken, isAuthenticated } from "./auth";
const urlApi = "https://6040127af3abf00017785815.mockapi.io/api/v3"


export const requestApi = (endpoint, method = "GET", params = null, data = null, headerOptions = null) => {

    return axios.request({
        baseURL: urlApi,
        url: endpoint,
        method: method.toLowerCase(),
        params: params,
        data: data,
        headers: (isAuthenticated())
            ? (headerOptions === 'files')
                ? { "Content-Type": `multipart/form-data; boundary=${data._boundary}`, 'Authorization': `Bearer ${getToken()}` }
                : { 'Authorization': `Bearer ${getToken()}` }
            : {}
    })
        .then(response => response.data)
        .catch(error => Promise.reject(error))
        .then(data => Promise.resolve(data))
}