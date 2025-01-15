import { useState } from "react";
import Header from "../src/components/header/header";
import Footer from "../src/components/footer/Footer";

const DIAGNOSTICOS = [
    {nombre: "Rinitis alergica", fecha: "2023-10-10", centro: "Goldenfold", doctor: "Helena Garcia"},
    {nombre: "Virus T", fecha: "2023-10-05", centro: "Vitaltech", doctor: "Yago Garcia"},
    {nombre: "Covid 19", fecha: "2024-11-03", centro: "Goldenfold", doctor: ""},
    {nombre: "Fractura muscular", fecha: "$2024-12-31", centro: "Vitaltech", doctor: "Fernando Lopez-Nuño"},
    {nombre: "Gripe", fecha: "2025-01-01", centro: "Goldenfold", doctor: "Alejandro"},
    {nombre: "Neumonia", fecha: "2025-01-12", centro: "Viatltech", doctor: "Eric"},
    {nombre: "Lupus", fecha: "2025-01-03", centro: "Goldenfold", doctor: "Marc"}
];

function DiagnosisRow({diagnosis}){
    return (
        <div className="diagnostico-row">
            <div className="diagnostico-info">
                <div className="diagnostico-cell" style={{ fontWeight: 'bold' }}>
                    {diagnosis.nombre}
                </div>
                <div className="diagnostico-cell" style={{ color: 'grey', fontSize: '0.8em' }}>
                    {diagnosis.fecha}
                </div>
                <div className="diagnostico-cell" style={{ fontSize: '0.8em' }}>
                    Centro: {diagnosis.centro}
                </div>
            </div>
            <div className="diagnostico-button-cell">
                <button>Ver detalles</button>
            </div>
        </div>
    )
}


function DiagnosisList({ diagnosticos, filterName, filterDate, filterCentre }){
    const rows = [];

    diagnosticos.forEach((diagnosis) => {
        if (diagnosis.nombre.toLowerCase().indexOf(filterName.toLowerCase()) === -1) {
            return;
        }
        if (diagnosis.fecha.toLowerCase().indexOf(filterDate.toLowerCase()) === -1) {
            return;
        }
        if (diagnosis.centro.toLowerCase().indexOf(filterCentre.toLowerCase()) === -1) {
            return;
        }
        rows.push(
            <DiagnosisRow  diagnosis={diagnosis}
            key={diagnosis.nombre}/>
        )
    })

    return (
        <div className="diagnostico-table">
            {rows}
        </div>
    )
}

function DiagnosisFilter({filterName, setFilterName, filterDate, setFilterDate, filterCentre, setFilterCentre}) {
    return (
        <div className="diagnostico-searchbox">
            <form>
                <div className="diagnostico-filterbox">
                    <h1 style={{ fontWeight: 'bold', fontSize: '1.2em' }}>Filtrar</h1>
                    <label style={{ fontSize: '0.9em' }}>Nombre</label>
                    <input className="diagnostico-input" type="text" value={filterName} placeholder="Selecciona el nombre"
                    onChange={(e) => setFilterName(e.target.value)}/>

                    <label style={{ fontSize: '0.9em' }}>Fecha</label>
                    <input className="diagnostico-input" type="text" value={filterDate} placeholder="Selecciona una fecha"
                    onChange={(e) => setFilterDate(e.target.value)}/>

                    <label style={{ fontSize: '0.9em' }}>Centro</label>
                    <input className="diagnostico-input" type="text" value={filterCentre} placeholder="Selecciona un centro"
                    onChange={(e) => setFilterCentre(e.target.value)}/>

                </div>
            </form>
        </div>
        
    )
}

export default function Page(){
    const [filterName, setFilterName] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [filterCentre, setFilterCentre] = useState('');

    return (
        <>
            <Header />
            <h1 className="diagnostico-title">Diagnosticos</h1>
            <div className="diagnostico-page">
                <DiagnosisList diagnosticos={DIAGNOSTICOS} filterName={filterName} 
                filterDate={filterDate}
                filterCentre={filterCentre}/>
                <DiagnosisFilter filterName={filterName} setFilterName={setFilterName}
                filterDate={filterDate} setFilterDate={setFilterDate}
                filterCentre={filterCentre} setFilterCentre={setFilterCentre}
                />
            </div>
            <Footer />
        </>
        
    )
}
