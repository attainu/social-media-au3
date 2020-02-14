import React from 'react'
import { Card, Button } from 'react-bootstrap'

function ProfilePicture() {
    return (
        <Card className="border-0">
            <Card.Img variant="top" src="https://image.flaticon.com/icons/svg/2095/2095102.svg" roundedcircle="true"/>
            <Card.Body>
                <Card.Title className="text-center">Full Name</Card.Title>
                <Button variant="light" size="sm" block>Change picture</Button>
            </Card.Body>
        </Card>
    )
}

export default ProfilePicture;