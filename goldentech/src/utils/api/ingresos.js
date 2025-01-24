const API_URL = 'https://localhost:7200/api';

export const getIngresos = async () => {
    const response = await fetch(`${API_URL}/Ingres`);
    if (!response.ok) {
        throw new Error('Error al obtener los ingresos.');
    }
    return await response.json();
};