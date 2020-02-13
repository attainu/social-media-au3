import React from 'react';

import { Navbar, Nav, NavDropdown } from "react-bootstrap";

function NavBar() {
    return (
        <Navbar collapseOnSelect expand="xl" style={{background:"#F4845F"}} variant="dark">
            <Navbar.Brand href="#home">socialme</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto"> 
                    <div className="input-group mt-1">
                        <input type="text" size="40" className="form-control" placeholder="Search..." aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="button"><span className="fa fa-x fa-search"/></button>
                        </div>
                    </div>
                </Nav>
                <Nav>
                    <NavDropdown title="Me" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/app/profile">Profile</NavDropdown.Item>
                        <NavDropdown.Divider/>
                        <NavDropdown.Item href="#signout">Sign Out</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="#messenger">Messenger</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar;