import { useEffect, useState } from "react";
import { getPacients, getPacientById } from "../src/services/apiService";
import Header from "../src/components/header/header";
import Footer from "../src/components/footer/Footer";

export default function Pacientes() {
  //en 'pacientes' vamos a guardar la lista de pacientes; setPacientes es una func. para cambiar el valor de pacientes; useState[] establece
  //que pacientes se inicia vacío:
  const [pacientes, setPacientes] = useState([]);

  //idem para guardar los episodios de 1 paciente concreto:
  const [episodios, setEpisodios] = useState([]);

  //el use effect hace que se ejecute esto solo 1 vez cuando se MONTA el componente, entendiendo por montar exclusivamente la 1a renderización
  //del componente. por ej, cuando pulsas en el botón "pacientes" desde "main", es en ese momento cuando se ejecuta el useEffect y ya no más
  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        //guardamos en data toda la info de todos los pacientes:
        const data = await getPacients();
        //grabamos dicha info en el array definido arriba ("pacientes"):
        setPacientes(data);
      } catch (error) {
        console.error("Error obteniendo pacientes con el servicio: ", error);
      }
    };

    const fetchEpisodios = async () => {
      try {
        //obtenemos el paciente deseado mediante su dni:
        const paciente = await getPacientById("07495694V");
        //...y guardamos sus episodios:
        console.log("Paciente obtenido:", paciente);
        setEpisodios(paciente.episodisMedics || []);
      } catch (error) {
        console.error("Error obteniendo los episodios médicos: ", error);
      }
    };

    fetchPacientes();
    fetchEpisodios();
  }, []);

  return (
    <>
      {/*añadimos el footer: */}
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

      <br></br>
      <br></br>

      <h2>Episodios médicos del paciente 07495694V</h2>
      <div>
        {/* esto comprueba si el usuario tiene más de 0 episodios, si es así los imprime; si no, mensaje de "no hay" */}
        {episodios.length > 0 ? (
          <ul>
            {episodios.map((episodio, index) => (
              <li key={index}>
                <strong>Motivo:</strong> {episodio.motivo} <br />
                <strong>Fecha de apertura:</strong> {episodio.dataObertura}{" "}
                <br />
                <strong>Estado:</strong> {episodio.estat}
                <br></br>
                <br></br>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay episodios médicos para este paciente.</p>
        )}
      </div>

      {/*añadimos el footer: */}
      <Footer />
    </>
  );
}
