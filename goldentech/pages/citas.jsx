import Header from "../src/components/header/header";
import Footer from "../src/components/footer/Footer";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const CITAS = [
    { motivo: "Consulta general", fecha: "2025-01-15", doctor: "Dr. Juan Pérez", planta: "Cardiología", piso: "3" },
    { motivo: "Revisión de radiografía", fecha: "2025-01-18", doctor: "Dra. María López", planta: "Traumatología", piso: "2" },
    { motivo: "Vacunación", fecha: "2025-01-20", doctor: "Dr. Carlos García", planta: "Pediatría", piso: "1" },
    { motivo: "Consulta dermatológica", fecha: "2025-01-22", doctor: "Dra. Ana Sánchez", planta: "Dermatología", piso: "4" },
    { motivo: "Chequeo anual", fecha: "2025-01-25", doctor: "Dr. Roberto Gómez", planta: "Medicina General", piso: "5" }
];

function CitaOpcion({ iconSrc, title, description, listItems }) {
    return (
        <div className="cita-opcion">
            <div className="cita-top">
                <img src={iconSrc} alt="icono" style={{ width: '50px', height: '50px' }} />
                <div className="cita-si">
                    <h3 style={{ margin: "0px" }}>{title}</h3>
                    <p style={{ margin: "0px", color: "rgb(88, 85, 85)", fontFamily: "'Roboto', sans-serif" }}>
                        {description}
                    </p>
                </div>
            </div>
            <CitaList listItems={listItems} />
        </div>
    );
}


function CitaList({ listItems }) {
    const [selectedIndex, setSelectedIndex] = React.useState(null);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    return (
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <Divider />
            <List component="nav" aria-label="secondary mailbox folder">
                {listItems.map((item, index) => (
                    <React.Fragment key={index}>
                        <ListItemButton
                            selected={selectedIndex === index}
                            onClick={(event) => handleListItemClick(event, index)}
                        >
                            <ListItemText primary={
                                <Typography sx={{ fontWeight: 'bold' }}>
                                    {item}
                                </Typography>
                            } />
                            <ListItemIcon sx={{ minWidth: 0, marginLeft: "auto" }}>
                                <ArrowForwardIosIcon fontSize="small" />
                            </ListItemIcon>
                        </ListItemButton>
                        {index < listItems.length - 1 && <Divider />}
                    </React.Fragment>
                ))}
            </List>
        </Box>
    );
}

function MotivosSeccion() {
    return (
        <>
            <h3 className="cita-subtitulo">Motivos</h3>
            <div className="cita-selectbox">
                <CitaOpcion
                    iconSrc="/assets/cita.png"
                    title="Citas y consultas"
                    description="Selecciona una de las siguientes opciones"
                    listItems={[
                        "Consulta con mi medico de cabecera",
                        "Dudas sobre tratamientos o medicación",
                        "Esperando el resultado de una prueba",
                        "Seguimiento de un problema de salud cronico",
                        "Vacunación",
                        "Cura de una herida",
                        "Consulta por tramitos administrativos"
                    ]}
                />
                <div className="cita-select">
                <CitaOpcion
                    iconSrc="/assets/documento.png"
                    title="Baja laboral"
                    description="Selecciona una de las siguientes opciones"
                    listItems={[
                        "Solicitud de baja",
                        "Renovación de baja",
                        "Solicitud de alta"
                    ]}
                />
                <CitaOpcion
                    iconSrc="/assets/medicamento.png"
                    title="Plan de medicación"
                    description="Selecciona una de las siguientes opciones"
                    listItems={[
                        "Renovación del plan de medicación",
                        "Copia del plan de medicación"
                    ]}
                />
                </div>
                <CitaOpcion
                    iconSrc="/assets/calendario.png"
                    title="Otros motivos y gestiones"
                    description="Selecciona una de las siguientes opciones"
                    listItems={[
                        "Cita con el odontologo",
                        "Cita con la ginecologa",
                        "Consulta de atención sexual y reproductiva"
                    ]}
                />
            </div>
        </>
    );
}


export default function CitasPage() {
    return (
        <>  
            <Header />
            <div className="cita-header">
                <div className="cita-informacion">
                    <h1 className="cita-title">Citas, consultas y gestiones</h1>
                    <p className="cita-info">Selecciona la opción que más se adecúe con tus necesidades</p>
                </div>
                <div className="cita-tuscitas">
                <button className="cita-button">Ver tus citas</button> 
                </div>
            </div>
            <MotivosSeccion />
            <Footer />
        </>
    )
    
}