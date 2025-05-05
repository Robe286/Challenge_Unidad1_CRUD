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

// CREAR USUARIO CON REST CLIENT ---- ¿Se puede asignar un id + automatizado?
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
       return usuario.nombre === personaje
    })
    res.json(findPersonaje)
    
})

app.put('/usuarios/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    const datosActualizados = req.body;

    const index = usuarios.findIndex(usuario => usuario.nombre === nombre);
    if (index === -1) { // Manejo de errores con if y operador lógico igualdad stricta
        return res.status(404).json({ mensaje: `Usuario con nombre ${nombre} no encontrado` });
    }

    usuarios[index] = { ...usuarios[index], ...datosActualizados }; // crea nuevo objeto y lo reemplaza

    res.json({
        mensaje: `Usuario con nombre ${nombre} actualizado`,
        datos: usuarios[index],
    });
});

app.delete('/usuarios/:nombre', (req, res) => {
    const nombre = req.params.nombre
    const encontrarUsuario = usuarios.find(usuario => usuario.nombre === nombre)
    if (!encontrarUsuario) {
        return res.status(404).json({ mensaje: `Usuario con nombre ${nombre} no encontrado` })
    }

    usuarios = usuarios.filter(usuario => usuario.nombre !== nombre); // filter devuelve un nuevo array con los usuarios
    // que no han coincidido en la comparación y excluye el usuario que si coincide en esta. 
    
    res.json({
        mensaje: `Usuario con nombre ${nombre} eliminado`,
        datos: usuarios
    });
})

app.listen(PORT, () => {
    console.log(`El servidor está escuchando en el puerto: http://localhost:${PORT}`);
})

// CREAR USUARIO CON POST OBTENIENDO DATOS DE UN FORMULARIO
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

// ACTUALIZAR USUARIO UTILIZANDO findIndex() y SPREAD OPERATOR -- SE TRABAJA CON COPIAS
// ¿MEJOR ESTE O OBJECT ASSIGN?

/*
app.put('/usuarios/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    const datosActualizados = req.body;

    const index = usuarios.findIndex(usuario => usuario.nombre === nombre);
    if (index === -1) { // Manejo de errores con if y operador lógico igualdad stricta
        return res.status(404).json({ mensaje: `Usuario con nombre ${nombre} no encontrado` });
    }

    usuarios[index] = { ...usuarios[index], ...datosActualizados }; // crea nuevo objeto y lo reemplaza

    res.json({
        mensaje: `Usuario con nombre ${nombre} actualizado`,
        datos: usuarios[index],
    });
});

*/

// PUT con find() y Object,

/*
app.put('/usuarios/:nombre', (req, res) => {
    const nombre = req.params.nombre
    const datosActualizados = req.body;
    
    const usuario = usuarios.find(usuario => usuario.nombre === nombre);
    if (!usuario) {
        return res.status(404).json({mensaje: `Usuario con nombre ${nombre} no encontrado`})
    }
    Object.assign(usuario, datosActualizados);
    res.json({
        mensaje:`Usuario con nombre ${nombre} actualizado`,
        datos: usuario,
    });
});
*/

/*
El método find ejecuta la función callback una vez por cada índice del array
hasta que encuentre uno en el que el callback devuelva un valor verdadero. 
Si es así, find devuelve inmediatamente el valor del elemento.
En caso contrario, find devuelve undefined.
*/

// Se usa find() en vez de .findIndex() para obtener directamente el usuario.
// Object.assign() actualiza el objeto sin necesidad de crear uno nuevo o copiar el array.
// Menos líneas y más directo?
// ----------------------------- ESTUDIAR IDONEIDAD --------------------------------------




