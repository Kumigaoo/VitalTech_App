import Footer from "../src/components/footer/Footer";
import Header from "../src/components/header/header";

const CITAS = [
    { motivo: "Consulta general", fecha: "2025-01-15", doctor: "Dr. Juan Pérez", planta: "Cardiología", piso: "3" },
    { motivo: "Revisión de radiografía", fecha: "2025-01-18", doctor: "Dra. María López", planta: "Traumatología", piso: "2" },
    { motivo: "Vacunación", fecha: "2025-01-20", doctor: "Dr. Carlos García", planta: "Pediatría", piso: "1" },
    { motivo: "Consulta dermatológica", fecha: "2025-01-22", doctor: "Dra. Ana Sánchez", planta: "Dermatología", piso: "4" },
    { motivo: "Chequeo anual", fecha: "2025-01-25", doctor: "Dr. Roberto Gómez", planta: "Medicina General", piso: "5" }
];

function Cita(){
    return(
        <></>
    )
}

function ListaCitas({citas}){
    return(
        <div>

        </div>
    )
}


export default function Agenda(){
    return (
        <>
            <Header />
            <h1 className="cita-title">Agenda</h1>
            <ListaCitas citas={CITAS}/>
            <Footer />
        </>
    )
    
}
