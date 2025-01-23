import axios from 'axios';

//se define la url de la api:
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7200/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

//movida para manejar errores:
api.interceptors.response.use(
  response => response, //si la respuesta es correcta, la pasa directamente
  error => {
    console.error('Axios error:', error.response || error.message); //en caso de que se produzca 1 error, lo muestra
    return Promise.reject(error); 
  }
);

//métodos para obtener pacientes y pacientes x id:
export const getPacients = async () => {
  try {
    //recuperamos de la api todos los pacientes y los guardamos en una const:
    const response = await api.get('/Pacient');
    //returneamos response.data. el .data es algo agregado por Axios: contiene la respuesta del servidor, es decir, toda la info del paciente:
    return response.data;
  } catch (error) {
    console.error('Error obteniendo pacientes:', error);
    throw error; 
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

//esto permite que podamos importar la api en otros archivos sin necesidad de usar llaves {} : 
export default api;
