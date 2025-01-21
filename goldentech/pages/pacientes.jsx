import { useEffect, useState } from "react";
import { getPacients } from "../src/services/apiService";

export default function Pacientes() {
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const data = await getPacients();
        setPacientes(data);
      } catch (error) {
        console.error('Error obteniendo pacientes:', error);
      }
    };

    fetchPacientes();
  }, []);

  return (
    <div>
      <h1>Lista de Pacientes</h1>
      <table>
        <thead>
          <tr>
            <th>DNI</th>
            <th>Nombre</th>
            <th>Edad</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map((paciente) => (
            <tr key={paciente.dni}>
              <td>{paciente.dni}</td>
              <td>{paciente.nom}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
