import axios from "axios";

const http = axios.create({
    baseURL: 'https://api.coingecko.com/api/v3/',
    // params: {
    //     'start': '1',
    //     'limit': '5000',
    //     'convert': 'USD'
    // },
    // headers: {
    //     'X-CMC_PRO_API_KEY': 'f6997c7f-bf7c-4709-8fec-6c19eb5bcf62'
    // }
})


export default http
