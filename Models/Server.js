const express = require( 'express' );
const cors = require( 'cors' );

class Server {
    constructor() {
        this.app    = express();
        this.port   = process.env.port;
        this.server = require( 'http' ).createServer( this.app );
        this.io = require( 'socket.io' )( this.server );
        this.paths = {}

        // * Middlewares
        this.middlewares();

        // * Rutas de la applicación
        this.routes();

        // *
        this.sockets();
    }

    middlewares() {
        // * Cors
        this.app.use( cors() );

        // * Directorio Público
        this.app.use( express.static( 'public' ) );
    }

    routes() {
        // this.app.use( this.paths.auth, require( '../routes/auth' ) );
    }

    sockets() {
        this.io.on( 'connection', socket => {
            console.log( 'Cliente Conectado', socket.id );

            socket.on( 'disconnect', () => {
                console.log( 'Cliente desconectado', socket.id );
            });

            socket.on( 'enviar-mensaje', ( payload, callback ) => {
                const id = 12345;

                // * Emite una evento para los clientes
                this.io.emit( 'enviar-mensaje', payload );

                callback({ id, fecha: new Date().getTime() });
            });
        });
    }

    listen() {
        this.server.listen( this.port, () => {
            console.log( 'Servidor corriendo en el puerto:', this.port );
        });
    }
}

module.exports = Server;