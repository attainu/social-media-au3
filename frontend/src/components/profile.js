import React, { useContext, useState, useEffect } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'

// import { UserContext } from '../index'
import ProfilePicture from './profilepicture'
import ProfileForm from './profileform'

const axios = require('axios');

function Profile() {

    // const { email } = useContext(UserContext);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        axios.get(`/userinfo/${JSON.parse(localStorage.getItem('user')).email}`)
        .then(res => {
            setUserData(res.data);
        })
        .catch(err => console.log(err));
    }, [])

    return (
        <Container>
            <Row className="justify-content-around align-items-stretch pt-3 pb-1">
                <Col xs={6} md={3} sm={6} lg={2}>
                    <ProfilePicture/>
                </Col>
                <Col xs={8} md={5} sm={10} lg={5}>
                    <ProfileForm data={userData}/>
                </Col>
                <Col xs={8} md={2} sm={10} lg={2}>
                    <Button variant="light" block>Edit</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default Profile;