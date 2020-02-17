import React, { useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'

import ProfilePicture from './profilepicture'
import ProfileForm from './profileform'

export const EditContext = React.createContext();

function Profile(props) {

    const [allowEdit, setallowEdit] = useState(true);

    return (
        <Container>
            <Row className="justify-content-around align-items-stretch pt-3 pb-1">
                <Col xs={6} md={3} sm={6} lg={2}>
                    <ProfilePicture/>
                </Col>
                <Col xs={8} md={5} sm={9} lg={5}>
                    <EditContext.Provider value={{allowEdit, setallowEdit}}>
                        <ProfileForm userdata={props.data}/>
                    </EditContext.Provider>
                </Col>
                <Col xs={8} md={2} sm={3} lg={2}>
                    <Button variant="light" onClick={() => setallowEdit(false)} block>Edit</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default Profile;