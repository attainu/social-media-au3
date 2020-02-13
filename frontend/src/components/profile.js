import React, { useContext } from 'react'

import { UserContext } from '../index'

function Profile() {

    const { email } = useContext(UserContext);
    return (
        <div>
            Profile area <br/>
            User email: { email }
        </div>
    )
}

export default Profile;