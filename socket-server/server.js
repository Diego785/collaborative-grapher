const express = require('express');
// const app = express();
// const server = require('http').Server(app);



const cors = require('cors');

const app = require('express')();
app.use(cors());

const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: 'http://127.0.0.1:8000',
        methods: ['GET', 'POST']
    }
});

// const io = require('socket.io')(server);


// Configura las rutas y middleware de express si es necesario

io.on('connection', (socket) => {
    console.log('Usuario conectado:', socket.id);




    //----------------- AQUÍ MANEJAMOS TODOS LOS EVENTOS DE SOCKETS ------------------//


    socket.on('messageSent', (message) => {
        console.log('Mensaje recibido en el servidor:', message);
        // Hacer lo que desees con el mensaje en el lado del servidor
        // ...

        // Emitir el mensaje a todos los clientes conectados
        io.emit('messageReceived', message);
    });

   



    socket.on('disconnect', () => {
        console.log('Usuario desconectado:', socket.id);
        // Realiza cualquier limpieza o acción necesaria al desconectarse el usuario
    });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log('Servidor de sockets iniciado en el puerto', port);
});
