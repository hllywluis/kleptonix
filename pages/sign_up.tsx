import Head from "next/head"
import { useRouter } from "next/router"
import { useState } from "react"
import { useSession } from "next-auth/react"
import { retrieve_user } from "../tools/retrieve_user"

import Alert from "react-bootstrap/Alert"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import KleptonixNavbar from "../components/navbar"
import { linkStyle } from "../styles/linkStyle"
import { brandStyle } from "../styles/brandStyle"

export async function getServerSideProps(req) {
  return retrieve_user(req)
}

export default function SignUp({ user }) {
  const { data: session } = useSession()
  const { query } = useRouter()

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const checkPassword = (password, confirmPassword) => {
    if (password === "") {
      return "p-empty"
    } else if (confirmPassword === "") {
      return "c-empty"
    } else if (password !== confirmPassword) {
      return "not-match"
    } else {
      return "success"
    }
  }

  if (session) {
    return (
      <>
        <Head>
          <title>Kleptonix | Secret</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <KleptonixNavbar user={user} />

        <Container className="text-center pt-2">
          <Alert variant="secondary">
            <Alert.Heading style={linkStyle}>
              Wanna sign out first?
            </Alert.Heading>
            <p>You've already got an account, dummy! Easter egg found.</p>
          </Alert>
        </Container>
      </>
    )
  } else {
    return (
      <>
        <Head>
          <title>Kleptonix | Sign Up</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <KleptonixNavbar user={{}} />

        <Container className="text-center pt-2">
          <Alert
            show={passwordError === "p-empty"}
            variant="danger"
            onClose={() => setPasswordError("")}
            dismissible
          >
            <Alert.Heading style={linkStyle}>
              You didn't type in a password.
            </Alert.Heading>
            <p>To ensure your account is secure, please type in a password.</p>
          </Alert>
          <Alert
            show={passwordError === "c-empty"}
            variant="danger"
            onClose={() => setPasswordError("")}
            dismissible
          >
            <Alert.Heading style={linkStyle}>
              You didn't type in your password confirmation.
            </Alert.Heading>
            <p>
              To make sure that your password isn't mistyped, please confirm
              your password.
            </p>
          </Alert>
          <Alert
            show={passwordError === "not-match"}
            variant="danger"
            onClose={() => setPasswordError("")}
            dismissible
          >
            <Alert.Heading style={linkStyle}>
              Did you type your password in properly?
            </Alert.Heading>
            <p>Your password confirmation doesn't match your password.</p>
          </Alert>
          <Alert
            show={query.error === "email-taken" ? true : false}
            variant="danger"
          >
            <Alert.Heading style={linkStyle}>
              Did you forget you had an account?
            </Alert.Heading>
            <p>That email is already taken.</p>
          </Alert>
        </Container>

        <Container className="text-center pt-2">
          <h1 style={linkStyle}>
            Create your <span style={brandStyle}>Kleptonix</span> account here
          </h1>
          <h4 style={brandStyle} className="text-muted">
            Your data is yours, no funny business allowed
          </h4>
        </Container>
        <Container className="pt-5">
          <Form action="/api/create_account" method="POST">
            <Form.Group className="mb-3" controlId="sign_up_username">
              <Form.Label style={brandStyle}>Username</Form.Label>
              <Form.Control
                type="text"
                name="dname"
                placeholder="Username"
                required
              />
              <Form.Text style={linkStyle} className="text-muted">
                This is how you'll be known to other users.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="sign_up_email">
              <Form.Label style={brandStyle}>Email address</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="luis@kleptonix.com"
                required
              />
              <Form.Text style={linkStyle} className="text-muted">
                You'll need it in case you forget your password.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="sign_up_password">
              <Form.Label style={brandStyle}>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
                onChange={(password) => setPassword(password.target.value)}
                required
              />
              <Form.Text style={linkStyle} className="text-muted">
                Make it secure, and make sure you remember it.
              </Form.Text>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="sign_up_password_confirmation"
            >
              <Form.Label style={brandStyle}>Confirm Password</Form.Label>
              <Form.Control
                name="password_confirmation"
                type="password"
                placeholder="Confirm Password"
                onChange={(confirmPassword) =>
                  setConfirmPassword(confirmPassword.target.value)
                }
                required
              />
              <Form.Text style={linkStyle} className="text-muted">
                Confirm your password.
              </Form.Text>
            </Form.Group>
            <Container className="text-center pt-2">
              <Button
                style={brandStyle}
                variant="dark"
                onClick={() =>
                  setPasswordError(checkPassword(password, confirmPassword))
                }
                type={passwordError === "success" ? "submit" : "button"}
              >
                Sign Up
              </Button>
            </Container>
          </Form>
        </Container>
      </>
    )
  }
}
