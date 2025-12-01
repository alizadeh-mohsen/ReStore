import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = "http://localhost:5000/api/"
const sleep = () => new Promise(resolve => setTimeout(resolve, 500));

const getResponseBody = (response: AxiosResponse) => response.data

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
    get: (url: string) => axios.get(url).then(getResponseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(getResponseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(getResponseBody),
    delete: (url: string) => axios.delete(url).then(getResponseBody)
}

const Catalog = {
    list: () => requests.get('products'),
    details: (id: number) => requests.get(`products/${id}`)
}

const Buggy = {
    get400Error: () => requests.get('buggy/bad-request'),
    get401Error: () => requests.get('buggy/unauthorized'),
    get404Error: () => requests.get('buggy/not-found'),
    get500Error: () => requests.get('buggy/server-error'),
    getValidationError: () => requests.get('buggy/validation-Error')
}


const agent = {
    Catalog,
    Buggy
}

export default agent;