import { useEffect, useState } from "react";
import { getPacients } from "../src/services/apiService";
import Header from "../src/components/header/header";
import Footer from "../src/components/footer/Footer";

export default function Pacientes() {

  //en 'pacientes' vamos a guardar la lista de pacientes; setPacientes es una func. para cambiar el valor de pacientes; useState[] establece
  //que pacientes 
  const [pacientes, setPacientes] = useState([]);

  //el use effect hace que se ejecute esto solo 1 vez cuando se MONTA el componente, entendiendo por montar exclusivamente la 1a renderización
  //del componente. por ej, cuando pulas en el botón "pacientes" desde "main", es en ese momento cuando se ejecuta el useEffect y ya no más
  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const data = await getPacients(); 
        setPacientes(data);
      } catch (error) {
        console.error('Error obteniendo pacientes con el servicio:', error);
      }
    };
  
    fetchPacientes();
  }, []);

  return (
    <div>
      <Header/>
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

      <br></br>
      <br></br>
      
      
      
      <Footer/>
    </div>
  );
}
