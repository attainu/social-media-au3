import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import Sign from './components/sign'
import App from './components/app'

import 'bootstrap/dist/css/bootstrap.min.css'

function SocialMe() {
    return (
        <Router>
            <Route exact path="/" component={
                () => <Redirect to="/app/home"/>
            }/>
            <Route path="/sign" component={Sign}/> 
            <Route path="/app" component={App}/>
        </Router>
    )
}

ReactDOM.render(<SocialMe/>, document.getElementById('root'));