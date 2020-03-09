import React, { useState } from 'react'
import { Alert, Card, Button } from 'react-bootstrap'

import './styles/profilepicture.css'

const axios = require('axios')

function ProfilePicture(props) {
    
    const [change, setChange] = useState(false);
    const [picture, updatePicture] = useState();
    const [error, setError] = useState({
        isError: false,
        message: ""
    })

    let handleSubmit = e => {
        e.preventDefault();

        if(picture === undefined) {
            setError({...error, isError: true, message: "No picture selected"});
            return;
        }
        else {
            setError({...error, isError: false, message: ""});
            const formData = new FormData();
            formData.append("proPic", picture);

            axios.put(`/api/profile/update/picture/${JSON.parse(localStorage.getItem('user')).email}`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).token
                }
            })
            .then(res => {
                setError({...error, isError: false, message: ""});
                window.location.reload(false);
            })
            .catch(err => setError({...error, isError: true, message: "Updation failed"}));
        }
    }

    return (
        <Card className="border-0">
            {
                error.isError && (
                    <Alert variant="danger">
                        {error.message}
                    </Alert>
                )
            }
            <Card.Img variant="top" src={props.propic} roundedcircle="true"/>
            {
                change ? (
                    <Card.Body>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <div className="custom-file">
                                    <input type="file" name="files" id="customFile" className="custom-file-input form-control-sm" onChange={e => updatePicture(e.target.files[0])}/>
                                    <label className="custom-file-label col-form-label-sm" htmlFor="customFile">Choose picture</label>
                                </div>
                            </div>
                            <div className="d-flex">
                                <Button variant="light" type="submit" size="sm">Upload</Button>
                                <Button variant="light" size="sm" onClick={() => {
                                    setError({...error, isError: false, message: ""});
                                    setChange(false);
                                }}>Close</Button>
                            </div>
                        </form>
                    </Card.Body>
                ) : (
                    <Card.Body>
                        <Button variant="light" size="sm" block onClick={() => setChange(true)} block>Change picture</Button>
                    </Card.Body>
                )
            }
            
        </Card>
    )
}

export default ProfilePicture;