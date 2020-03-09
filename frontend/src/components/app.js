import React, { useState, useEffect } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'

import NavBar from './navbar'
import Profile from './profile'
import Home from './home'
import Search from './search'
import Messenger from './mess'
import Logout from './logout'
const axios = require('axios')

function App() {

    const [userData, setUserData] = useState({});
    const history = useHistory();

    useEffect(() => {
        if(localStorage.getItem('user')) {
            axios.get(`/api/profile/userinfo/${JSON.parse(localStorage.getItem('user')).email}`, {
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
                    <Route exact path="/app/search/:name" component={Search}/>
                    <Route exact path="/app/messenger" component={
                        () => <Messenger username={userData.Username} profilePicture={userData.Picture}/>
                    }/>    
                    <Route path="/logout" component={Logout}/>                
                </Switch>
            </div>
        </div>
    )
}

export default App;