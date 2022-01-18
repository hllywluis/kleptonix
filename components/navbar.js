import { useRouter } from 'next/router'

import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'

export default KleptonixNavbar => {
    const router = useRouter()

    const brandStyle = {
        fontFamily: "Bangers, sans-serif",
        pointerEvents: "none"
    }

    const linkStyle = {
        fontFamily: "Staatliches, serif"
    }

    return (
        <Navbar>
            <Container fluid>
                <Navbar.Brand style={brandStyle}>Kleptonix</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-start">
                    <Nav style={linkStyle} activeKey={router.pathname}>
                        <Nav.Link href="/">Home</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <Nav style={linkStyle} activeKey={router.pathname}>
                        <Nav.Link href="/sign_in">Sign In</Nav.Link>
                        <Navbar.Text>or</Navbar.Text>
                        <Nav.Link href="/sign_up">Sign Up</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    )
}