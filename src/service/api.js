import axios from 'axios';

const baseUrl = axios.create({
    baseURL: 'https://api-gitvagas.up.railway.app/api'
});

export default baseUrl;