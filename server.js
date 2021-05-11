const WebSocket = require(`ws`);
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const socketServer = new WebSocket.Server({server})
app.use(express.json({type: () => true}));
const {handlers} = require('./back/handleEvent');
const {untils} = require('./back/untils');

socketServer.on('connection', (ws) => {
    ws.on('message', (JSONData) => {


        const data = JSON.parse(JSONData);
        console.log(data);
        const keys = Object.keys(data);
        keys.forEach((key) => {
            const dataInfo = data[key];
            if (key === 'changeChat') {
                const user = untils.getUserByWs(ws);
                handlers.changeChat(user, dataInfo);

                let responseForBefore = JSON.stringify(untils.getClientState('before'));
                untils.getWebSockets('before').forEach((socket) => socket.send(responseForBefore));

                let responseForAfter = JSON.stringify(untils.getClientState('after'));
                untils.getWebSockets('after').forEach((socket) => socket.send(responseForAfter))
                return;
            }

            const response = handlers[key](ws, dataInfo);
            const user = untils.getUserByWs(ws);
            untils.getWebSockets(user.chat).forEach((ws) => {
                ws.send(JSON.stringify(response));
            })
        })
    })
    ws.on('close', () => {
        const removableUser = untils.getUserByWs(ws);
        if(!removableUser) return
        const chat = removableUser.chat;
        const users = handlers.removeUser(removableUser, chat);
        untils.getWebSockets(chat).forEach((socket) => {
            socket.send(JSON.stringify(users));
        })
    })
})

app.use(express.static('front'))


// app.get('/chat', (req, res) => {
//     res.sendFile(__dirname + "/front/ChatPage/index.html");
// })
// app.get('/chat/index.css', (req, res) => {
//     res.sendFile(__dirname + "/front/ChatPage/index.css");
// })
// app.get('/chat/logic.js', (req, res) => {
//     res.sendFile(__dirname + "/front/ChatPage/logic.js");
// })


server.listen(8080, () => {
    console.log('server started');
});


