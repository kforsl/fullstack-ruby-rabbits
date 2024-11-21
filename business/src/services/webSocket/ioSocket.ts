import { io } from 'socket.io-client';
export const socket = io('http://localhost:3000/');

socket.on('newOrder', () => {
    console.log('Det har skapats en ny order');
});

socket.on('newOrderStatus', () => {
    console.log('En order har uppdaterats');
});
