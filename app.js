const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];

app.get('/', (req, res) => {
    res.send(`
    <h1>Personajes Street Fighter</h1>
    <ul>
    ${usuarios.map((usuario) => `<li>id: ${usuario.id} | Nombre: ${usuario.nombre} | Edad: ${usuario.edad} | Procedencia: ${usuario.lugarProcedencia}</li>`  ).join('')}
    </ul>
    <form action="/usuarios" method="post">
    <label for="nombre">Nombre</label>
    <input type="text" id="nombre" name="nombre" required>
    <label for="edad">Edad</label>
    <input type="text" id="edad" name="edad" required>
    <label for="lugarProcedencia">Procedencia</label>
    <input type="text" id="lugarProcedencia" name="lugarProcedencia" required>
    <button type="submit">Agregar usuario</button>
    </form>
    <a href="/usuarios">Usuarios Json</a>
    <a href="/usuarios/Ryu">Personaje json</a>
    `)
})

app.get('/usuarios', (req, res) => {
    res.json(usuarios);
})

// CREAR USUARIO CON REST CLIENT
app.post('/usuarios', (req, res) => {
    const nuevoUsuario = req.body;
    res.status(201).json({
        mensaje: 'Usuario creado',
        usuario: nuevoUsuario
    });
    usuarios.push(nuevoUsuario)
});

app.get('/usuarios/:nombre', (req, res) => {
    const findPersonaje = usuarios.find((usuario) => {
        const personaje = req.params.nombre;
       return usuario.nombre.toLowerCase() === personaje.toLowerCase()
    })
    res.json(findPersonaje)
    
})

app.put('/usuarios/:nombre', (req, res) => {
    const {nombre} = req.params;
    const datosActualizados = req.body;
    res.json({
        mensaje:`Usuario con nombre ${nombre} actualizado`,
        datos: datosActualizados,
    });
    const index = usuarios.findIndex(usuario => usuario.nombre === nombre)
    const nuevoArray = [...usuarios];
    nuevoArray[index] = {...usuarios[index], nombre: `${nombre}`};
});


app.listen(PORT, () => {
    console.log(`El servidor está escuchando en el puerto: http://localhost:${PORT}`);
})

// CREAR USUARIO OBTENIENDO DATOS DE FORMULARIO
/*
app.post('/usuarios', (req, res) => {
    const nuevoUsuario = {
        id: usuarios.length + 1,
        nombre: req.body.nombre,
        edad: req.body.edad,
        lugarProcedencia: req.body.lugarProcedencia
    }
    usuarios.push(nuevoUsuario);
    res.redirect('/');
});
*/
