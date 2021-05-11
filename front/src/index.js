import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {Register} from './pages/Register';
import {Chat} from './pages/Chat';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


const App = () => {
    return (
        <Router>
            <div>
                <hr />
                <Switch>
                    <Route exact path="/">
                        <Register />
                    </Route>
                    <Route path="/chat">
                        <Chat />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}


ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
