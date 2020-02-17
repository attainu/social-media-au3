import React, { useState, useEffect } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'

import NavBar from './navbar'
import Profile from './profile'

const axios = require('axios')

function App() {

    const [userData, setUserData] = useState({});
    const history = useHistory();

    useEffect(() => {
        if(history.action === "POP") {
            history.push("/sign");
        }
        if(localStorage.getItem('user')) {
            axios.get(`/userinfo/${JSON.parse(localStorage.getItem('user')).email}`, {
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
                </Switch>
            </div>
        </div>
    )
}

export default App;