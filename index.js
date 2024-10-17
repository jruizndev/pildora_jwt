const express = require('express')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')

const SECRET_KEY = 'supersecretkey' // Clave secreta para firmar el token
const app = express()
app.use(bodyParser.json())

// Ruta para hacer login y generar un JWT
app.post('/login', (req, res) => {
    const { username, password } = req.body

    // Validación simple (solo como ejemplo, no es segura para producción)
    if (username === 'user123' && password === 'password') {
        const user = { id: 1, username: 'user123', role: 'user' } // Datos del usuario que irán en el token
        const token = jwt.sign(user, SECRET_KEY, { expiresIn: '1h' }) // Token firmado (expira en 1 hora)
        return res.json({ token })
    }

    res.status(401).json({ message: 'Usuario o contraseña incorrectos' }) // Error si las credenciales no coinciden
})

// Middleware para proteger rutas y validar el token
function verifyToken(req, res, next) {
    const token = req.headers['authorization'] // Obtenemos el token del header

    if (!token) {
        return res.status(403).json({ message: 'Token no proporcionado' }) // Error si no hay token
    }

    // Verificamos el token
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido' }) // Error si el token es inválido
        }

        req.user = decoded // Guardamos los datos del token en la request
        next() // Pasamos al siguiente middleware
    })
}

// Ruta protegida para obtener el perfil del usuario
app.get('/profile', verifyToken, (req, res) => {
    res.json({
        message: 'Perfil del usuario',
        user: req.user,
    })
})

// Iniciar el servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000')
})
