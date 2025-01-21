# VitalTech_App

VitalTech_App es un ecosistema de aplicaciones diseñado para gestionar y optimizar las operaciones hospitalarias. Este proyecto incluye tres aplicaciones principales que están integradas mediante una arquitectura robusta y moderna. A continuación, se describen las características y estructura del proyecto.

## Índice
1. [Descripción General](#id1)
2. [Arquitectura del Proyecto](#id2)
3. [Aplicaciones Incluidas](#id3)
4. [Tecnologías Utilizadas](#id4)
5. [Instalación y Configuración](#id5)



    
## Descripción General
<div id='id1' />
VitalTech_App nació como una única aplicación llamada VitalTech, dirigida al personal hospitalario. Con el tiempo, se adquirió otra aplicación similar llamada Goldenfold, que también estaba orientada al personal hospitalario. Para optimizar el desarrollo y mantenimiento, ambas aplicaciones fueron integradas en un monorepo utilizando NX.

Más adelante, se creó GoldenTech, una aplicación React enfocada en proporcionar servicios directamente a los pacientes, sirviendo como puente entre ambas aplicaciones Angular y ampliando el alcance del sistema.

## Arquitectura del Proyecto
<div id='id2' />
El proyecto está organizado en un monorepo que sigue las mejores prácticas para el desarrollo y mantenimiento de múltiples aplicaciones:

- **Monorepo**: Utiliza NX para gestionar las aplicaciones VitalTech y Goldenfold, ambas construidas con Angular.

- **Aplicación independiente**: GoldenTech, desarrollada con React, se integra con las funcionalidades comunes mediante API.

- **Backend**: La API del sistema está desarrollada con ASP.NET.

- **Base de datos compartida**: Todas las aplicaciones comparten una base de datos común para garantizar la consistencia de los datos.

## Aplicaciones Incluidas
<div id='id3' />
    
**1. Vitaltech**
- Dirigida al personal hospitalario.
- Permite gestionar procesos administrativos y clínicos.
- Construida con Angular y alojada en el monorepo.

**2. Goldenfold**
- También dirigida al personal hospitalario.
- Comparte funcionalidades comunes con VitalTech.
- Construida con Angular y alojada en el monorepo.

**3. GoldenTech**
- Dirigida a los pacientes.
- Combina y extiende funcionalidades de VitalTech y Goldenfold.
- Construida con React como una aplicación independiente.


## Tecnologías Utilizadas
<div id='id4' />

- Frontend:
  - Angular (VitalTech y Goldenfold).
  - React (GoldenTech).

- Basckend:
  - ASP.NET para la API.

- Monorepo:
  - NX para la gestión del código.

- Base de datos:
  - Compartida entre todas las aplicaciones para garantizar integridad y consistencia.

## Instalación y Configuración
<div id='id5' />
    
### Requisitos previos
- Node.js
- .NET SDK
- Angular CLI
- NX CLI
- Base de datos configurada

### Ejecución de la API
1. Asegúrate de tener un entorno seguro configurado para HTTPS.
2. Ejecuta el siguiente comando para iniciar la API:
    ```plaintext
    dotnet watch --launch-profile https
    ````
3. La API requiere autenticación mediante Keycloak. Asegúrate de tener un usuario creado con los permisos adecuados. Puedes iniciar sesión en cualquiera de las aplicaciones Angular para autenticarte.

### Instalación y Configuración de las Aplicaciones

**En la raiz del proyecto**
1. Instalar NX globalmente:
    ```plaintext
    npm install -g nx
    ```

**Para las aplicaciones Angular (VitalTech y Goldenfold)**
1. Accede al directorio de la aplicación correspondiente.
2. Instala las dependencias necesarias:
   ```plaintext
   npm install
   npm install fuse.js --save
   npm install @angular/material
   ```
3. Para ejecutar con soporte HTTPS:
   ```plaintext
   npm install -g nx
   ```   

**Para la aplicación React(GoldenTech)
1. Accede al directorio de la aplicación GoldenTech.
2. Instala las dependencias necesarias:
   ```plaintext
   npm install
   npm install @fortawesome/free-solid-svg-icons
   npm install @fortawesome/react-fontawesome @fortawesome/fontawesome-svg-core
   npm install @mui/material @emotion/react @emotion/styled
   npm install @mui/icons-material
   npm install axios
   npm install @mui/lab
   npm install dayjs
   npm install @mui/x-date-pickers
   ```
3. Actualiza la versión de Next.js para compatibilidad con HTTPS:
    ```plaintext
    npm i next@latest react@latest react-dom@latest eslint-config-next@latest
    ```
4. Ejecuta la aplicación con soporte HTTPS:
   ```plaintext
   npx next dev --experimental-https
   ```
