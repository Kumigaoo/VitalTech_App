const API_URL = 'https://localhost:7200/api';

export const fetchDoctores = async () => {
    const response = await fetch(`${API_URL}/doctores`);
    if (!response.ok) {
        throw new Error('Error al obtener doctores');
    }
    return await response.json();
};