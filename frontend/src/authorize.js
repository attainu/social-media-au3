import React from 'react'
import {Redirect} from 'react-router-dom'

function Authorize() {

    const isloggedIn=localStorage.getItem("user")
    
    const helper = () => {
        return <Redirect to ="/sign"/>
    }

    return (
        <>
            {
                !isloggedIn ? helper() : null
            }
        </>
    )
}

export default Authorize;