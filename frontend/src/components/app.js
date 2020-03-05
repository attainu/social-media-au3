import React, { useState, useEffect } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'

import NavBar from './navbar'
import Profile from './profile'
import Home from './home'
// import Messenger from './mess'
const axios = require('axios')

function App() {

    const [userData, setUserData] = useState({});
    const history = useHistory();

    useEffect(() => {
        if(localStorage.getItem('user')) {
            axios.get(`/profile/userinfo/${JSON.parse(localStorage.getItem('user')).email}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).token
                }
            })
            .then(res => {
                setUserData(res.data);
            })
            .catch(err => {
                localStorage.clear('user');
                history.push("/sign");
            });
        }
    }, [])

    return (
        <div className="body">
            <NavBar/>
            <div>
                <Switch>
                    <Route exact path="/app/profile" component={
                        () => <Profile data={userData}/>
                    }/>
                    <Route exact path="/app/home" component={
                        () => <Home username={userData.Username}/>
                    }/>
                    {/* <Route exact path="/app/messenger" component={Messenger}/>                     */}
                </Switch>
            </div>
        </div>
    )
}

export default App;