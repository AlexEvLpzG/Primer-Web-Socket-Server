// * Referencias del HTML
const lblOnline  = document.querySelector( '#lblOnline' );
const lblOffline = document.querySelector( '#lblOffline' );

const socket = io();

socket.on( 'connect', () => {
    console.log( 'Conectado al servidor' );

    lblOffline.style.display = 'none';
    lblOnline.style.display  = '';
});

socket.on( 'disconnect', () => {
    console.log( 'Desconectado del servidor' );

    lblOnline.style.display  = 'none';
    lblOffline.style.display = '';
});