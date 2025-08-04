# POKERESCATE
![Icono de Pokerescate](../assets/icon-small.png)

&emsp;Esta es una app de expo con react-native para el curso de Desarrollo de Aplicaciones de Coderhouse. El proyecto es un mock de una app para refugios con el objetivo de recaudar fondos a través de donaciones mensuales a modo de patrocinio de animales individuales. 

&emsp;A modo de demo se pobló la base de datos de firebase utilizando datos seleccionados de [pokeAPI](https://pokeapi.co/). La conección con firebase se realiza con `createApi` de [ReduxJS](https://redux.js.org/). Se utiliza una store armada con [Redux Toolkit](https://redux.js.org/redux-toolkit) para almacenar temporalmente de manera centralizada ciertos datos.

## FEATURES
- LogIn y SignUp con Firebase Authentication
- Persistencia de sesión en base de datos local con [SQLite](https://sqlite.org/docs.html)
- Persistencia de foto de perfil del usuario en Firebase Realtime Database
- Filtrar animales por tags (o pokemon por tipo)
- Carousel de Animales destacados de la semana
- Posibilidad de "Auspiciar" animales (pago no implementado), agregandolos a tu "familia" persistida en firebase
- Posibilidad de dejar de auspiciar
- Lista de animales auspiciados con fecha de introducción a la familia

## REQUISITOS PREVIOS

Antes de instalar y ejecutar la app, necesitás tener instalados:

- Node.js (versión 20 o superior recomendada)
- Expo CLI (global)
- Git
- Una cuenta de Firebase con proyecto configurado (opcional, para autenticación y base de datos).*

&emsp;&emsp;* Se Suben dos json, uno llamado "pokemon" con una lista de pokemon utilizando la estructura `Pokemon` y otro llamado "types" con una lista de tipos utilizando la estructura `Type`, definidas en `src/global/interface.ts`.

## INSTALACIÓN Y CONFIGURACIÓN


1. Cloná el repositorio:

```bash 
git clone https://github.com/valxkiria/pokerescate 
cd pokerescate
```

2. Instalá las dependencias:

```bash
npm install
```

3. Configurá las variables de entorno para Firebase

    Crea un archivo .env en la raíz del proyecto con las siguientes variables:

    ```
    EXPO_PUBLIC_BASE_RTDB_URL = {url base de la Realtime Database de tu proyecto de Firebase}
    EXPO_PUBLIC_BASE_AUTH_URL = {url base de Firebase Authentication}
    EXPO_PUBLIC_API_KEY = {tu API KEY de tu proyecto de Firebase}
    ```

4. Iniciá la aplicación en modo desarrollo:

```bash
npx expo start
```

5. Abre la aplicación en un emulador o en un celular con Expo Go

