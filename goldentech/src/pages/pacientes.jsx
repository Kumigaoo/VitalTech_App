import { useEffect, useState } from "react";
import { fetchPacientes } from "../utils/api/pacientes";
import Header from "../components/header/header";
import Footer from "../components/footer/Footer";

export default function Pacientes() {
  const [pacientes, setPacientes] = useState([]); // Cambié 'obtenerPacientes' a 'setPacientes'
  const [error, setError] = useState(null); // Necesitas definir el estado de error

  useEffect(() => {
    const obtenerPacientes = async () => {
      try {
        const data = await fetchPacientes();
        setPacientes(data);
      } catch (error) {
        setError(error.message);
      }
    };

    obtenerPacientes();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!pacientes.length) return <div>Cargando...</div>;

  return (
    <div>
      <Header />
      <h1>Lista de Pacientes</h1>
      <table className="tablaPacientes">
        <thead>
          <tr>
            <th>DNI</th>
            <th>Nombre</th>
            <th>Primer apellido</th>
            <th>Segundo apellido</th>
            <th>Núm. SS</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map((paciente) => (
            <tr key={paciente.dni}>
              <td className="casillaPacientes">{paciente.dni}</td>
              <td>{paciente.nom}</td>
              <td>{paciente.cognom1}</td>
              <td>{paciente.cognom2}</td>
              <td>{paciente.numSS}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Footer />
    </div>
  );
}