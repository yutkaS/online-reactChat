import React, {useCallback} from 'react'
import {Button} from "../../components/Button";
import {Input} from "../../components/Input";
import {UsersList} from "../../components/UserList";
import {MessagesList} from "../../components/MessagesList";
import {Initialization} from "../../API/Initialization";

import './index.css'


if (!localStorage.user) window.location.replace('http://localhost:3000/')
const storage = JSON.parse(localStorage.user);

const socket = Initialization();

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

    const send = useCallback((obj)=>{
        socket.send(JSON.stringify(obj))
    }, [socket])

    return (
        <body>
        <div className="message_container">

            <div className="info">
                <div className="select_chat_block">
                    <p>select chat</p>

                    <Button className="before_button"
                            onClick={() => send({changeChat: 'before',})}
                            text={'JS (before ES6)'}/>

                    <Button className="after_button"
                            onClick={() => send({changeChat: 'after',})}
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
                <Input onChange={(e) => message = e}/>
                <Button className={'sendButton'} text={'send'}
                        onClick={() => send({addMessage: {message: message,}})}/>
            </div>
        </div>
        </body>
    )
}

