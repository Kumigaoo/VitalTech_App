const API_URL = 'https://localhost:7200/api';

export const getPruebasDiagnosticas = async () => {
    const response = await fetch(`${API_URL}/PruebasDiagnosticas`);
    if (!response.ok) {
        throw new Error('Error al obtener las pruebas diagnósticas.');
    }
    return await response.json();
};