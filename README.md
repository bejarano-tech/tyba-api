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
    - Axios
    - BCrypt
    - CUID:
    - JsonWebtoken
    - MongoDB

## Ventajas

- Muy Resiliente a cambios: Es decir, a medida que las cosas cambian al rededor del mundo, el código puede sobrevivir, adapdarse y cambiar con el mundo.
- Independientes de Frameworks. No estan acopladas a librerias, lo que permite utilizar estas librerías como herramientas que son fácilmente sustituibles.
- Testables. las reglas de negocio son fácilmente testables sin utilizar la interfaz de usuario, base de datos, servidor web.
- Independientes de la interfaz de usuario. La interfaz de usuario es fácilmente modificable.
- Independientes de la base de datos. Es fácil sustituir una base de datos por otra sin afectar a las reglas de negocio.
- El dominio es la parte más importante la capa de dominio es la más importante y de la que dependen todas las demás pero el dominio no depende de ninguna. ¿como consigue el dominio comunicarse con las demás capas sin depender de ellas?, haciendo uso del principio SOLID de Inversión de dependencia. Escribí hace tiempo un artículo profundizando en este princpio.
- Permite desacoplar las capas y manejar una responsabilidad por función.
- Gestión de pruebas más fácil y eficiente.
- Escalabilidad.
- Debugeabilidad.
- Up un Running más rápido.

## Documentación y Referencia

Si tiene postman instalado puede importar la collección adjunta en la raíz del código fuente.

Si quiere ver online vaya a:


[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/ce074ab0d68eeccdc1c9#?env%5Btyba%5D=W3sia2V5IjoiUE9SVCIsInZhbHVlIjoiMzAwMCIsImVuYWJsZWQiOnRydWV9LHsia2V5IjoiQkFTRV9VUkwiLCJ2YWx1ZSI6Imh0dHA6Ly9sb2NhbGhvc3QiLCJlbmFibGVkIjp0cnVlfSx7ImtleSI6IkFQSV9ST09UIiwidmFsdWUiOiIvYXBpIiwiZW5hYmxlZCI6dHJ1ZX0seyJrZXkiOiJURVNUX0VNQUlMIiwidmFsdWUiOiJ0eWJhQGV4YW1wbGUuY29tIiwiZW5hYmxlZCI6dHJ1ZX0seyJrZXkiOiJURVNUX1BBU1NXT1JEIiwidmFsdWUiOiJ0ZXN0LXBhc3N3b3JkIiwiZW5hYmxlZCI6dHJ1ZX1d)

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

## Iniciar CON Docker Compose Development:

```
docker-compose up -f docker-compose-dev.yml --build
```


## Iniciar CON Docker Compose Prod:

`Asegurese de tener corriendo una instancia de mongodb y de configurar en el .env las variables que comienzan con TB_DB_ con sus correspondientes valores`
```
docker-compose up -f docker-compose.yml --build
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

## Seguridad
Esta API está asegurada usando Json Web Tokens.

Un Token header debe estar en el request para prevenir errores 403 No Authorizado.

Previamente haga una petición a /api/auth/login endpoint con sus credenciales y la respusta contiene un token temporal para usar en las siguientes peticiones.

Cuando el token ha expirado el servidor responderá 403 no autorizado y debe hacer otra petición a login con los credenciales.