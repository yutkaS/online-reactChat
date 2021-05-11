import React, { useState, useCallback } from 'react';
import { Input } from '../../components/Input'
import  { Button } from  '../../components/Button'

export const Register = () => {
    let [message, setMessage] = React.useState('');
    let [chat, setChat] = React.useState('before');

    return(
        <div className="init-block">
            <Input className={"name"}
                   onChange={(e) => message = e.target.value}/>
            <select name="" id="" onChange={(e) => chat = e.target.value}>
                <option value="before"> JS (before ES6)</option>
                <option value="after"> JS (after ES6)</option>
            </select>
            <Button className={"submit"} text={'submit'} onClick={() => {
                const newLocalStorage = {chat: chat, userName: message,};
                localStorage.user = JSON.stringify(newLocalStorage);
                window.location.replace('http://localhost:3000')
            }}/>
        </div>
    )
}