import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7200/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejar los errores de respuesta
api.interceptors.response.use(
  response => response, // Si la respuesta es correcta, la pasa directamente
  error => {
    console.error('Axios error:', error.response || error.message); // Muestra el error en consola
    return Promise.reject(error); // Rechaza la promesa con el error
  }
);

// Funciones para interactuar con la API
export const getPacients = async () => {
  try {
    const response = await api.get('/Pacient');
    return response.data;
  } catch (error) {
    console.error('Error obteniendo pacientes:', error);
    throw error; // Re-lanza el error para que lo maneje el componente
  }
};

export const getPacientById = async (id) => {
  try {
    const response = await api.get(`/Pacient/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error obteniendo el paciente con DNI ${id}:`, error);
    throw error;
  }
};

export default api;
