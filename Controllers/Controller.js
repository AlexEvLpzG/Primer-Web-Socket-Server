
const socketController = ( socket ) => {
    console.log( 'Cliente Conectado', socket.id );

    socket.on( 'disconnect', () => {
        console.log( 'Cliente desconectado', socket.id );
    });

    socket.on( 'enviar-mensaje', ( payload, callback ) => {
        const id = 12345;
        
        callback({ id, fecha: new Date().getTime() });

        // * Emite una evento para los clientes pero no para el que lo envio
        socket.broadcast.emit( 'enviar-mensaje', payload );
    });
}

module.exports = { socketController };