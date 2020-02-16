import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import Sign from './components/sign'
import App from './components/app'

import 'bootstrap/dist/css/bootstrap.min.css'

function SocialMe() {
    const doRedirect = () => {
        let loggedIn = localStorage.getItem('user');

        if(loggedIn != undefined) {
            return <Redirect to="/app/profile"/>
        }
        else {
            return <Redirect to="/sign"/>
        }
    }

    return (
        <Router>
            <Route path="/sign" component={Sign}/>
            <Route path="/app" component={App}/>
            {doRedirect()}
        </Router>
    )
}

ReactDOM.render(<SocialMe/>, document.getElementById('root'));