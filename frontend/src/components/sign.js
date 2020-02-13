import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import SignIn from './signin'
import SignUp from './signup'

import './styles/sign.css'

function Sign() {
    return (
        <div className="sign">
            <Container>
                <Row>
                    <Col md={6} sm={12} className='pt-2 pl-5 pr-5 col-xs-12'>
                        <h2>Sign In</h2>
                        <SignIn/>
                    </Col>
                    <Col md={6} sm={12} className='pt-3 pl-5 pr-5 col-xs-12'>
                        <h2>Sign Up</h2>
                        <SignUp/>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Sign;