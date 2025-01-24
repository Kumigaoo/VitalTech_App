const API_URL = 'https://localhost:7200/api';

export const fetchPacientes = async () => {
    const response = await fetch(`${API_URL}/Pacient`);
    if (!response.ok) {
        throw new Error('Error al obtener pacientes');
    }
    return await response.json();
};