import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { ProdcutsParams } from "../models/ProductParams";

axios.defaults.baseURL = "http://localhost:5000/api/"
axios.defaults.withCredentials = true


const sleep = () => new Promise(resolve => setTimeout(resolve, 500));

const getResponseBody = (response: AxiosResponse) => {
    return response.data
}

axios.interceptors.response.use(async response => {
    await sleep()
    return response
}, (error: AxiosError) => {

    const { data, status }: AxiosResponse = error.response!;

    switch (status) {
        case 400: {
            toast.error(data.title);
            break;
        }
        case 401: {
            toast.error(data.title);
            break;
        }
        case 500: {
            toast.error(data.title);
            break;
        }
        default:
            break;
    }
    return Promise.reject(error.response)
}
)

const requests = {
    get: (url: string, params?: URLSearchParams) => axios.get(url, { params }).then(getResponseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(getResponseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(getResponseBody),
    delete: (url: string) => axios.delete(url).then(getResponseBody)
}

const Catalog = {
    list: (params: URLSearchParams) => requests.get('products', params),
    details: (id: number) => requests.get(`products/${id}`),
    getFilters: () => requests.get('products/filters')
}

const Buggy = {
    get400Error: () => requests.get('buggy/bad-request'),
    get401Error: () => requests.get('buggy/unauthorized'),
    get404Error: () => requests.get('buggy/not-found'),
    get500Error: () => requests.get('buggy/server-error'),
    getValidationError: () => requests.get('buggy/validation-Error')
}

const Basket = {
    get: () => requests.get('basket'),
    addItem: (productId: number, quantity = 1) => requests.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
    deleteItem: (productId: number, quantity = 1) => requests.delete(`basket?productId=${productId}&quantity=${quantity}`)

}

const agent = {
    Catalog,
    Buggy,
    Basket
}

export default agent;