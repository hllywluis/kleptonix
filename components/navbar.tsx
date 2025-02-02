import { memo } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useSession, signOut } from "next-auth/react"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import { ErrorBoundary } from "./ErrorBoundary"
import styles from "../styles/Navbar.module.css"
import type { NavbarProps, NavLinkProps } from "../types/components"

const NavLink = memo(
  ({ href, children, onClick }: NavLinkProps): JSX.Element => {
    const router = useRouter()
    const isActive = router.pathname === href

    return (
      <Nav.Link as={Link} href={href} onClick={onClick} active={isActive}>
        {children}
      </Nav.Link>
    )
  }
)

NavLink.displayName = "NavLink"

const KleptonixNavbar = memo(
  ({ user, className }: NavbarProps): JSX.Element => {
    const { data: session, status } = useSession()
    const isLoading = status === "loading"

    const handleSignOut = async (): Promise<void> => {
      try {
        await signOut({ callbackUrl: "/" })
      } catch (error) {
        console.error("Sign out error:", error)
      }
    }

    return (
      <ErrorBoundary>
        <Navbar
          className={`${styles.navbar} ${className ?? ""} ${
            isLoading ? styles.loading : ""
          }`}
        >
          <Container fluid>
            <Navbar.Collapse className="justify-content-start">
              <Nav className={styles.nav}>
                <NavLink href="/">Home</NavLink>
                <NavLink href="/kleptons">Kleptons</NavLink>
                <NavLink href="/about">About</NavLink>
              </Nav>
            </Navbar.Collapse>

            <Navbar.Brand className={styles.brand}>Kleptonix</Navbar.Brand>
            <Navbar.Toggle />

            <Navbar.Collapse className="justify-content-end">
              <Nav className={styles.nav}>
                {!session ? (
                  <>
                    <NavLink href="/sign_in">Sign In</NavLink>
                    <span className={styles.divider}>or</span>
                    <NavLink href="/sign_up">Sign Up</NavLink>
                  </>
                ) : (
                  <>
                    <NavLink href="/profile">
                      {user?.dname ?? "Profile"}
                    </NavLink>
                    <NavLink href="#" onClick={handleSignOut}>
                      Sign Out
                    </NavLink>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </ErrorBoundary>
    )
  }
)

KleptonixNavbar.displayName = "KleptonixNavbar"

export default KleptonixNavbar
