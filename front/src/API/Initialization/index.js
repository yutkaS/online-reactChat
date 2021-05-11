import io from 'soket.io';

export const Initialization = () => {
    let socket = io('http://localhost:3000');
    // const socket = new WebSocket(`ws://192.168.0.200:8080`);+
    return socket
}