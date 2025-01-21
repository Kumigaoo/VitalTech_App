import Footer from "../src/components/footer/Footer";
import Header from "../src/components/header/header";
import React, { useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';import CloseIcon from '@mui/icons-material/Close';

const CITAS = [
    { motivo: "Consulta general", fecha: "2025-01-15", hora: "8:20", doctor: "Dr. Juan Pérez", planta: "Cardiología", piso: "3" },
    { motivo: "Revisión de radiografía", fecha: "2025-01-18", hora: "16:20", doctor: "Dra. María López", planta: "Traumatología", piso: "2" },
    { motivo: "Vacunación", fecha: "2025-01-20", hora: "9:40", doctor: "Dr. Carlos García", planta: "Pediatría", piso: "1" },
    { motivo: "Consulta dermatológica", fecha: "2025-01-22", hora: "15:15", doctor: "Dra. Ana Sánchez", planta: "Dermatología", piso: "4" },
    { motivo: "Chequeo anual", fecha: "2025-01-25", hora: "10:30", doctor: "Dr. Roberto Gómez", planta: "Medicina General", piso: "5" }
];

function CitaRow({cita, onSelect, isSelected}){
    return(
        <div className={`agenda-rowbox ${isSelected ? 'selected' : ''}`}
            onClick={() => onSelect(cita)} // Cambiar la cita seleccionada al hacer clic
            style={{
                backgroundColor: isSelected ? '#e0f7fa' : 'white', // Fondo diferente si está seleccionada
                cursor: 'pointer', // Añadir un cursor de mano para indicar interactividad
            }}>
            <div className="agenda-info">
                <p style={{margin: "0px", color: "rgb(88, 85, 85)", fontFamily: "'Roboto', sans-serif", fontSize: '0.8em'}}>{cita.fecha} · {cita.hora}</p>
                <p style={{margin: "0px", fontWeight: 'bold', fontFamily: "'Roboto', sans-serif", fontSize: '1.0em'}}>{cita.motivo}</p>
                <p style={{margin: "0px", fontFamily: "'Roboto', sans-serif", fontSize: '1.0em'}}>{cita.planta}</p>
            </div>
            <div className="agenda-button">
                <IconButton 
                    sx={{
                        backgroundColor: 'primary.main',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'primary.dark',
                        },
                        width: 40,
                        height: 40,
                    }}
                    onClick={() => onSelect(cita)} 
                >
                    <AddIcon />
                </IconButton>
            </div>
        </div>
    )
}

function ListaCitas({citas, onSelect, selectedCita}){
    
    const rows = []
    
    citas.forEach((cita) => {
        rows.push(
            <CitaRow cita={cita} key={cita.motivo} onSelect={onSelect} isSelected={selectedCita === cita}/>
        )
    })
    return(
        <div className="agenda-list">
            {rows}
        </div>
    )
}


export default function Agenda(){
    const [selectedCita, setSelectedCita] = useState(null);
    const [citas, setCitas] = useState(CITAS);

    const handleClose = () => {
        setSelectedCita(null); // Cerrar la caja de información
    };


    const handleCancelCita = () => {
        // Eliminar la cita seleccionada de la lista
        setCitas(citas.filter(cita => cita !== selectedCita));
        setSelectedCita(null); // Opcional: cerrar la caja de información después de eliminar
    };

    return (
        <>
            <Header />
            <h1 className="cita-title">Agenda</h1>
            <div className="agenda-container">
                <ListaCitas citas={citas} onSelect={(cita) => setSelectedCita(cita)} selectedCita={selectedCita}/>
                {selectedCita && (
                    <Box className="cita-info-box" sx={{marginLeft: 2, padding: 2, border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9'}}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="h6" gutterBottom>{selectedCita.motivo}</Typography>
                            <IconButton
                                sx={{
                                    color: 'grey',
                                }}
                                onClick={handleClose} // Llamar a la función handleClose para cerrar la caja
                            >
                                <CloseIcon />
                            </IconButton>
                        </div>
                        <Typography variant="body1"><strong>Fecha:</strong> {selectedCita.fecha}</Typography>
                        <Typography variant="body1"><strong>Hora:</strong> {selectedCita.hora}</Typography>
                        <Typography variant="body1"><strong>Doctor:</strong> {selectedCita.doctor}</Typography>
                        <Typography variant="body1"><strong>Planta:</strong> {selectedCita.planta}</Typography>
                        <Typography variant="body1"><strong>Piso:</strong> {selectedCita.piso}</Typography>
                        <button className="agenda-button-cell" onClick={handleCancelCita}>Cancelar cita</button>
                        <Typography variant="body1" style={{margin: "0px", color: "rgb(88, 85, 85)", fontFamily: "'Roboto', sans-serif", fontSize: '0.8em'}}>
                            Si desea modificar la cita, cambiar la fecha o otro motivo, por favor contacte directamente con el hospital o con su doctor para realizar los ajustes necesarios.
                        </Typography>
                    </Box>
                )}
            </div>
            
            <Footer />
        </>
    )
    
}
//a