const express = require('express');
require('dotenv').config();
// const app = express();
// const server = require('http').Server(app);



const cors = require('cors');
const app = require('express')();

const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: 'http://127.0.0.1:8000',
        methods: ['GET', 'POST']
    }
});

// const io = require('socket.io')(server);

// Objeto para almacenar los usuarios conectados
const connectedUsers = {};

io.use((socket, next) => {
    // Verificar las credenciales del usuario al recibir una conexión
    const sessionId = socket.handshake.auth.sessionId;
    // Realiza la validación de las credenciales contra tu sistema de autenticación
    // Si el usuario está autenticado, continúa
    // Si no está autenticado, puedes emitir un evento de error o desconectar al usuario

    // Agregar el usuario a la lista de usuarios conectados
    connectedUsers[sessionId] = socket.id;

    // Continuar con la conexión
    next();
});


// Configura las rutas y middleware de express si es necesario

io.on('connection', (socket) => {
    const sessionId = socket.handshake.auth.sessionId;
    console.log('Usuario conectado:', socket.id);

    socket.on('messageSent', (message) => {
        console.log('Mensaje recibido en el servidor:', message);
        io.emit('messageReceived', { admin: 'Nuevo mensaje' });
    });


    socket.on('elementMoved', (position) => {
        // Emitir el nuevo posición a todos los clientes conectados, excepto al cliente que realizó el cambio
        console.log('Escuchando el movimiento del cuadro de la clase.')

        socket.broadcast.emit('elementMoved', position);
    });


    socket.on('createClass', (data)=>{
        console.log('Escuchando el movimiento de la creación de una clase.')

        socket.broadcast.emit('createClass', data);
    });


    socket.on('duplicateClass', (data) => {
        console.log('Escuchando la creación de una nueva clase.')

        socket.broadcast.emit('creatingClass', data);
    });

    socket.on('connectingClass', function (connectionData) {
        // Emitir la información de la conexión a todos los usuarios conectados
        socket.broadcast.emit('connectionCreated', connectionData);
    });

    socket.on('editContent', function (data) {
        // Emitir la información de la conexión a todos los usuarios conectados
        socket.broadcast.emit('saveContent', data); // TERMINAR DE IMPLEMENTAR EN EL CLIENTE
    });

    socket.on('clear', (data) => {
        // Emitir la información de la conexión a todos los usuarios conectados
        socket.broadcast.emit('clear-content', data); // TERMINAR DE IMPLEMENTAR EN EL CLIENTE
    });





    // socket.on('updateDiagram', (data) => {
    //     // Emitir el evento 'updateDiagram' a todos los clientes excepto al emisor
    //     socket.broadcast.emit('updateDiagram', data);
    // });

    socket.on('disconnect', () => {
        console.log('Usuario desconectado:', socket.id);
        delete connectedUsers[sessionId];
    });
});


const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log('Servidor de sockets iniciado en el puerto', port);
});
