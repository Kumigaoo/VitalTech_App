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
function HeaderContent() {
    
}

export default function LoginPage() {
    return (
        <>

        </>
    )
}


