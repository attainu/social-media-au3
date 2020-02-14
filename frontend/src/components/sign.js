import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import SignIn from './signin'
import SignUp from './signup'

function Sign() {
    return (
        <div className="sign">
            <Container>
                <Row className="justify-content-around align-items-center">
                    <Col xs={8} md={6} sm={8} lg={4} className='pt-2'>
                        <h2>Sign In</h2>
                        <SignIn/>
                    </Col>
                    <Col xs={8} md={6} sm={8} lg={4} className='pt-3'>
                        <h2>Sign Up</h2>
                        <SignUp/>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Sign;