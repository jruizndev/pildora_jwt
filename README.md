
# Práctica JWT con Node.js y Postman
## Enlace a presentación Canva

Puedes ver la presentación haciendo clic en el siguiente enlace:

[![Ver Presentación en Canva](https://img.shields.io/badge/Ver%20Presentaci%C3%B3n-Canva-brightgreen?style=for-the-badge&logo=canva)](https://www.canva.com/design/DAGTx70Laxs/sHDQ4qovdAtu2Uuc_B2Q2Q/view?utm_content=DAGTx70Laxs&utm_campaign=designshare&utm_medium=link&utm_source=editor)


## Descripción
Este proyecto es una implementación sencilla de autenticación usando **JSON Web Tokens (JWT)**. Permite generar tokens al iniciar sesión y acceder a una ruta protegida utilizando esos tokens.

## Requisitos previos
Asegurarse de tener instalados:
- **Node.js** (versión recomendada: 14.x o superior)
- **npm** (que viene con Node.js)
- **Postman** (o alguna otra herramienta para hacer solicitudes HTTP)

## Instrucciones para ejecutar el proyecto

### 1. Clonar el repositorio
Clonar el repositorio en el equipo local:

```bash
git clone https://github.com/jruizndev/pildora_jwt.git
```

### 2. Instalar dependencias
Desde la carpeta raíz del proyecto, ejecutar el siguiente comando para instalar las dependencias necesarias:

```bash
npm install
```

### 3. Ejecutar el servidor
Una vez instaladas las dependencias, iniciar el servidor con el siguiente comando:

```bash
npx nodemon index.js
```

Esto iniciará el servidor en `http://localhost:3000`.



### 4. Pruebas con Postman

#### a. Solicitud de login
Para obtener el **token** JWT, se debe realizar una solicitud \`POST\` a la ruta \`/login\`.

1. Abrir **Postman**.
2. Crear una nueva solicitud \`POST\`.
3. En la barra de dirección, usar la siguiente URL:

   ```
   http://localhost:3000/login
   ```

4. En la pestaña **Body**, seleccionar la opción **raw** y luego **JSON**.
5. En el cuerpo de la solicitud, introducir las credenciales como se muestra a continuación:

   ```json
   {
     "username": "user123",
     "password": "password"
   }
   ```

6. Enviar la solicitud. Si las credenciales son correctas, se recibirá una respuesta con un token JWT:

   ```json
   {
     "token": "<token-JWT-generado>"
   }
   ```

   **Nota:** Copiar el valor del campo \`token\`, ya que se necesitará en la siguiente prueba.

#### b. Solicitud a ruta protegida (/profile)
Para acceder a la ruta protegida \`/profile\`, se debe enviar el **token** obtenido en el paso anterior en el header de la solicitud.

1. Crear una nueva solicitud \`GET\` en Postman.
2. En la barra de dirección, usar la siguiente URL:

   ```
   http://localhost:3000/profile
   ```

3. Ir a la pestaña **Headers** y añadir el siguiente header:
   - **Key**: `Authorization`
   - **Value**: `<token-JWT-obtenido>`

   **Ejemplo:**
   
```plaintext
   Authorization: <token-JWT-generado>
```

5. Enviar la solicitud. Si el token es válido, el servidor responderá con la información del usuario:

   ```json
   {
     "message": "Perfil del usuario",
     "user": {
       "id": 1,
       "username": "user123",
       "role": "user"
     }
   }
   ```

### 5. Estructura del Proyecto
La estructura del proyecto es la siguiente:

```
/jwt-practice
├── node_modules/
├── index.js (archivo principal del servidor)
├── package.json
└── README.md (este archivo)
```

### 6. Notas adicionales
- El token tiene una validez de **1 hora**. Si el token expira, se recibirá una respuesta de error al intentar acceder a la ruta protegida, y será necesario realizar el login nuevamente.
- En un entorno de producción, se recomienda usar HTTPS para garantizar la seguridad de las solicitudes y mejorar la validación de credenciales.
