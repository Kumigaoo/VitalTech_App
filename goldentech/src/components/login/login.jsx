/*
import React from 'react';
import Keycloak from 'keycloak-js';
import { ReactKeycloakProvider, useKeycloak } from '@react-keycloak/web';

const keycloak = new Keycloak({
    realm: 'Dream Team',
    url: 'https://login.oscarrovira.com/realms/Dream%20Team',
    clientId: 'hospital-api',
});

const Login = () => {
    
    const { keycloak, initialized } = useKeycloak();

    if (!initialized) {
        return <div>Loading...</div>;
    }

    if (!keycloak.authenticated) {
        return (
            <div>
                <p>You are not authenticated</p>
                <button onClick={() => keycloak.login()}>Login</button>
            </div>
        );
    }

    return (
        <div>
            <p>Welcome, {keycloak.tokenParsed?.name}</p>
            <button onClick={() => keycloak.logout()}>Logout</button>
        </div>
    );
};

const LoginPage = () => (
    <ReactKeycloakProvider authClient={keycloak}>
        <Login />
    </ReactKeycloakProvider>
);

export default LoginPage;
*/

import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Link from 'next/link';

function Form({text}){
    return (
        <form>
            <div className='login-form'>
                <div className='login-data'>
                    <label>{text}</label>
                    <input className="login-input" type="text" placeholder=" "/>
                </div>

                <div className='login-contraseña'>
                    <label>Contraseña</label>
                    <input className="login-input" type="text" placeholder=" "/>
                </div>  
            </div>
                        
        </form>
    )
}

function SelectorOpcion() {

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className='login-select'>
            <Box sx={{width: '30%', typography: 'body1'}}>
            <TabContext value={value} centered>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Email" value="1" />
                        <Tab label="DNI" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <Form text={"Email"}/>
                </TabPanel>
                <TabPanel value="2">
                    <Form text={"DNI"}/>
                </TabPanel>
            </TabContext>
            </Box>
        </div> 
    )
}

function Acceder(){
    return(
        <div className='login-lala'>
            <Link href="/main" style={{ textDecoration: 'none', color: 'inherit' }}>
                <button className="cita-button">Acceder</button> 
            </Link>
            <p>He olvidado mi contraseña</p>
        </div>
    )
}

export default function LoginPage() {
    return (
        <>
            <h1 className="diagnostico-title">Acceder con contraseña</h1>
            <p className="cita-info">Selecciona una de las opciones para acceder a GoldenTech</p>
            <div className='login-cosa'>
                <SelectorOpcion />
                <Acceder />
            </div>
            
        </>
    )
}


