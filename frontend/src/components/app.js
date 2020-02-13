import React from 'react'
import { Route, Switch } from 'react-router-dom'

import NavBar from './navbar'
import Profile from './profile'

function App() {
    return (
        <div>
            <NavBar/>
            <div>
                <Switch>
                    <Route exact path="/app/profile" component={Profile}></Route>
                </Switch>
            </div>
        </div>
    )
}

export default App;