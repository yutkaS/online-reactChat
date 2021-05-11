import React from 'react'
import {Button} from "../../components/Button";
import {Input} from "../../components/Input";
import {UsersList} from "../../components/UserList";
import {MessagesList} from "../../components/MessagesList";
import './index.css'



const storage = localStorage.user ? JSON.parse(localStorage.user) : null

const socket = new WebSocket(`ws://localhost:8080`);

export const Chat = () => {

    socket.onopen = () => {
        socket.send(JSON.stringify({addUser: {userName: storage.userName, chat: storage.chat},}));
        console.log('socket was opened');
    }

    let [message, setMessage] = React.useState('');
    const [chatName, setChatName] = React.useState('');
    const [messages, setMessages] = React.useState([]);
    const [users, setUsers] = React.useState([]);

    socket.onmessage = (JSONMessage) => {
        const message = JSON.parse(JSONMessage.data);
        Object.keys(message).forEach((key) => {
                switch (key) {
                    case 'messages':
                        const newMessages = [...message.messages]
                        setMessages(newMessages);
                        return;
                    case 'chatName':
                        setChatName(message[key]);
                        return;
                    case 'users':
                        setUsers(message[key]);
                        return;
                }
            }
        )
    }

    return (
        <body>
        <div className="message_container">

            <div className="info">
                <div className="select_chat_block">
                    <p>select chat</p>

                    <Button className="before_button"
                            onClick={() => socket.send(JSON.stringify({changeChat: 'before',}))}
                            text={'JS (before ES6)'}/>

                    <Button className="after_button"
                            onClick={() => socket.send(JSON.stringify({changeChat: 'after',}))}
                            text={'JS (after ES6)'}/>
                </div>
                <div className="users_block">
                    <p>Users</p>
                    <div className="users">
                        <UsersList users={users}/>
                    </div>
                </div>
            </div>
            <div className="chat_info">
                <h2 className="chat_name">{chatName}</h2>
                <div className="messages">
                    <MessagesList messages={messages}/>
                </div>
                <Input onChange={(e) => message = e.target.value}/>
                <Button className={'sendButton'} text={'send'}
                        onClick={() => socket.send(JSON.stringify({addMessage: {message: message,}}))}/>
            </div>
        </div>
        </body>
    )
}

