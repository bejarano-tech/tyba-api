# Tyba Prueba Técnica Backend

Prueba técnica Backend Developer para Tyba.

# Introducción

Esta es una prueba técnica para Backend Developer Tyba.

La arquitectura se basa en la implemtación orientada a microservicios de la Arquitectura Limpia (Clean Architecture) definida por el tio Bob en un stack con nodejs.

## Conceptos

### Entidades:
    Encapsula la Lógica del negocio

    - auth
    - Id
    - user
    - transactions
### Controladores: 
    - transactions
    - users
    - places
    - auth
        - login
        - signup
        - logout
    - not-found

### Casos de Uso
    - transactions
    - users
    - places
    - auth

### Middlewares:
    - verify

### Acceso a Datos
    - transactions
    - users
    - places
    - auth

### Datos
    - transactions
    - users
    - places
    - auth


## Ventajas

- Permite desacoplar las capas y manejar una responsabilidad por función.
- Gestión de pruebas más fácil y eficiente.
- Escalabilidad.
- Debugeabilidad.
- Up un Running más rápido.

# Endpoints Principales

- /auth/signup - POST (name, email, password) ---> Crea un usuario y retorna el token que debe ir como header authorization en los request protegidos
- /auth/login - POST (email, password) ---> Retorna el token que debe ir como header authorization en los request protegidos
- /auth/logout - POST ---> Invalida el token de usuario y lo desloguea

- /transactions - GET (protected)

- /places - POST protected (latitude, longitude) (protected) ---> Requiere header 'jwt' con el token devuelto al hacer login

- /users - GET ()(protected) ---> Retorna la lista de todos los usuarios registrados

# Iniciar:

Descargue el repositorio

```
git clone https://github.com/bejarano-tech/tyba-api.git
cd tyba-api
```

Configure el entorno

```
cp .env.example .env
```

Remplace los valores en blanco con las correspondientes credenciales enviadas en el correo de la prueba

## Iniciar CON Docker Compose:

```
docker-compose up --build
```

## Iniciar SIN Docker Compose:

`Asegurese de tener corriendo una instancia de mongodb local y de configurar en el .env las variables que comienzan con TB_DB_ con sus correspondientes valores`

```
npm install
npm run dev
```

# Pruebas:

## Test unitarios
```
npm run test
```

## Test e2e

`Asegurese de tener corriendo el proyeto antes de ejecutar este comando`
```
npm run test:e2e
```