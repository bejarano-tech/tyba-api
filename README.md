# Tyba Prueba Técnica Backend

Prueba técnica Backend Developer para Tyba.

# Introducción

Esta es una prueba técnica para Backend Developer Tyba.

Aplicación orientada a microservicios en Nodejs, con Express y MongoDB implementando la Arquitectura Limpia (Clean Architecture) definida por el Tio Bob Martin.

## Arquitectura Limpia (Clean Architecture):

![alt text](https://xurxodev.com/content/images/2016/07/CleanArchitecture-8b00a9d7e2543fa9ca76b81b05066629.jpg)

Esta es la Arquitectura Limpia (Clean Architecture), es un modelo de Arquitectura desarrollado por el Tio Bob Marting, que es un programador y reconocido escritor.

En este proyecto se usa este modelo de arquitectura, con la idea de desarrollar microservicios que van manejar usuarios, autenticación de usuarios, gestión de transacciones y busqueda de restaurantes por coordenadas.

## Componentes

Esta arquitectura tiene como base 4 componentes

- Entidades: Son los conceptos principales del negocio, ej: Usuario.
- Casos de uso: Son las interacciones entre las Entidades, ej: Crear Usuario  
- Adaptadores: Son para aislar los Casos de Uso de las herramientas, es decir, de los frameworks y drivers que se usan en la app.
- Frameworks y Drivers: Herramientas que se usan para desarrollar la aplicación.

### Entidades:
    - auth
    - Id
    - user
    - transactions
### Casos de Uso
    - Agregar Transacción
        - /src/use-cases/add-transaction.js
    - Agregar Usuario
        - /src/use-cases/add-user.js
    - Modificar Transacción
        - /src/use-cases/edit-transaction.js
    - Modificar Usuario
        - /src/use-cases/add-usuario.js
    - Listar Lugares
        - /src/use-cases/list-places.js
    - Listar Transacciones
        - /src/use-cases/list-transactions.js
    - Listar Usuarios
        - /src/use-cases/list-users.js
    - Ingresar
        - /src/use-cases/login.js
    - Salir
        - /src/use-cases/logout.js
    - Recuperar contraseña (No implementado)
        - /src/use-cases/recovery.js
    - Refrescar sesión de Usuario
        - /src/use-cases/refresh.js
    - Registrarse
        - /src/use-cases/singup.js
    - Eliminar Usuario
        - /src/use-cases/remove-user.js
    - Eliminar Transacción
        - /src/use-cases/remove-transaction.js

### Adaptadores
    Controladores
        - Eliminar Transacción
            - /src/controllers/delete-transaction.js
        - Eliminar Usuario
            - /src/controllers/delete-user.js
        - Traer Lugares
            - /src/controllers/get-places.js
        - Traer Transacciones
            - /src/controllers/get-transactions.js
        - Traer Usuarios
            - /src/controllers/get-users.js
        - No Encontrado
            - /src/controllers/not-found.js
        - Modificar Transacción
            - /src/controllers/patch-transaction.js
        - Modificar Usuario
            - /src/controllers/patch-user.js
        - Post Ingreso
            - /src/controllers/post-login.js
        - Post Salir
            - /src/controllers/post-logout.js
        - Post Recuperar
            - /src/controllers/post-recovery.js
        - Post Refrescar
            - /src/controllers/post-refresh.js
        - Post Registrar
            - /src/controllers/post-singup.js
        - Post Usuario
            - /src/controllers/post-user.js

    Middlewares
        - Verificar Token
            - /src/middlewares/verify.js

### Frameworks y Drivers
    - NodeJs
    - Express
    - MongoDb
    - Jest

## Ventajas

- Muy Resiliente a cambios: Es decir, a medida que las cosas cambian al rededor del mundo, el código puede sobrevivir, adapdarse y cambiar con el mundo.
- Permite desacoplar las capas y manejar una responsabilidad por función.
- Gestión de pruebas más fácil y eficiente.
- Escalabilidad.
- Debugeabilidad.
- Up un Running más rápido.

## Documentación y Referencia

Si tiene postman instalado puede importar la collección adjunta en la raíz del código fuente.

Si quiere ver online vaya a 
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/1416bc7feac774ab4d80)

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

Instale las dependencias
```
npm install
```

Iniicie la aplicación
```
npm run start
```

## Desarrollo

Instale las dependencias
```
npm install
```

Iniicie la aplicación en modo desarrollo
```
npm run dev
```

# Pruebas:

## Test unitarios
Instale las dependencias
```
npm install
```
Corra las pruebas
```
npm run test
```

## Test e2e

Instale las dependencias
```
npm install
```
Corra las pruebas
```
npm run test:e2e
```

## Test de integración con Postman
Puede realizar las pruebas con una la colección de Postman siguiendo estos pasos:
    - Instalar Postman
    - Siga los pasos para iniciar la aplicación
    - Importe la colección de Postman
    - En postman Ingresar al Runner
    - Seleccionar de la lista derecha la collección importada Tyba Api.
    - Seleccionar el ambiente desarrollo
    - Iniciar el Runner.
