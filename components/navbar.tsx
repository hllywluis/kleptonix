import Link from "next/link"
import { useRouter } from "next/router"
import { useSession, signOut } from "next-auth/react"

import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"

export default function KleptonixNavbar({ user }) {
  const { data: session } = useSession()
  const router = useRouter()

  const brandStyle = {
    fontFamily: "Bangers, sans-serif",
    pointerEvents: "none" as "none",
  }

  const linkStyle = {
    fontFamily: "Staatliches, serif",
  }

  return (
    <Navbar>
      <Container fluid>
        <Navbar.Collapse className="justify-content-start">
          <Nav style={linkStyle} activeKey={router.pathname}>
            <Link href="/">
              <Nav.Link href="/">Home</Nav.Link>
            </Link>
            <Link href="/about">
              <Nav.Link href="/about">About</Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Brand style={brandStyle}>Kleptonix</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav style={linkStyle} activeKey={router.pathname}>
            {!session ? (
              <>
                <Link href="/sign_in">
                  <Nav.Link href="/sign_in">Sign In</Nav.Link>
                </Link>
                <Navbar.Text>or</Navbar.Text>
                <Link href="/sign_up">
                  <Nav.Link href="/sign_up">Sign Up</Nav.Link>
                </Link>
              </>
            ) : (
              <>
                <Link href="/profile">
                  <Nav.Link href="/profile">{user.dname ?? "Profile"}</Nav.Link>
                </Link>
                <Link href="#">
                  <Nav.Link onClick={() => signOut({ callbackUrl: "/" })}>
                    Sign Out
                  </Nav.Link>
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
