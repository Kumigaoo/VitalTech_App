import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7200/api',
    headers: {
        'Content-Type': 'application/json'
    },
    httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false }), // temporal, luego quitar
});

apiClient.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
    (response) => response, 
    (error) => {
        console.log('Error en la respuesta: ', error);
        return Promise.reject(error);
    }
)

export default apiClient;