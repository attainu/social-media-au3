import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import Sign from './components/sign'
import App from './components/app'

import 'bootstrap/dist/css/bootstrap.min.css';

export const UserContext = React.createContext();

function SocialMe() {
    const doRedirect = () => {
        let loggedIn = localStorage.getItem('token');

        if(loggedIn != undefined) {
            return <Redirect to="/app/profile"/>
        }
        else {
            return <Redirect to="/sign"/>
        }
    }

    const [email, setEmail] = useState("");

    return (
        <UserContext.Provider value={{email, setEmail}}>
            <Router>
                <Route path="/sign" component={Sign}/>
                <Route path="/app" component={App}/>
                {doRedirect()}
            </Router>
        </UserContext.Provider>
    )
}

ReactDOM.render(<SocialMe/>, document.getElementById('root'));