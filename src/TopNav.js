import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import neerejLogo from './Neerej.png'
import { LinkContainer } from 'react-router-bootstrap'



const TopNav = () => {
   
    return (
        <>
            <div>

                <Navbar bg="dark" expand="lg" variant="dark">
                    <Container>
                        <Navbar.Brand href="#home">

                        <img
                                alt=""
                                src={neerejLogo}
                                width="50"
                                height="50"
                                className="d-inline-block align-top"
                            />
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <LinkContainer to="/">
                                    <Nav.Link >Home</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to="/states">
                                    <Nav.Link >Country</Nav.Link>
                                </LinkContainer>
                                
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

            </div>

        </>
    )
}

export default TopNav;