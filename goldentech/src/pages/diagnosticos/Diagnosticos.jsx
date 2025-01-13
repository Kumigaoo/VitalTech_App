const DIAGNOSTICOS = [
    {nombre: "Rinitis alergica", fecha: "2023-10-10", centro: "Goldenfold", doctor: "Helena Garcia"},
    {nombre: "Virus T", fecha: "2023-10-05", centro: "Vitaltech", doctor: "Yago Garcia"},
    {nombre: "Covid 19", fecha: "2024-11-03", centro: "Goldenfold", doctor: ""},
    {nombre: "Fractura muscular", fecha: "$2024-12-31", centro: "Vitaltech", doctor: "Fernando Lopez-Nuño"},
    {nombre: "Gripe", fecha: "2025-01-01", centro: true, doctor: "Alejandro"},
    {nombre: "Neumonia", fecha: "2025-01-12", centro: "Viatltech", doctor: "Eric"},
    {nombre: "Lupus", fecha: "2025-01-03", centro: "Goldenfold", doctor: "Marc"}
];

function DiagnosisRow({diagnosis}){
    return (
        <tr>
            <td><span>{diagnosis.nombre}</span></td>
            <td>{diagnosis.fecha}</td>
            <td>Centro: {diagnosis.centro}</td>
        </tr>
    )
}


function MainContent({diagnosticos}) {
    const rows = [];

    diagnosticos.forEach((diagnosis) => {
        rows.push(
            <DiagnosisRow  diagnosis={diagnosis}
            key={diagnosis.nombre}/>
        )
    })

    return (
        <table>
            <tbody>{rows}</tbody>
        </table>
    )
}


function DiagnosisList({ diagnosticos }){
    return (
        <>
            <h1>Diagnosticos</h1>
            <MainContent diagnosticos={diagnosticos} />
        </>   
    )
}

export default function Page(){
    return <DiagnosisList diagnosticos={DIAGNOSTICOS} />
}
