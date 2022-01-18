import Head from "next/head"
import { useRouter } from "next/router"

import Alert from "react-bootstrap/Alert"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import KleptonixNavbar from "../components/navbar"

export default SignIn => {
    const { query } = useRouter()

    const brandStyle = {
        fontFamily: "Bangers, sans-serif"
    }

    const linkStyle = {
        fontFamily: "Staatliches, serif"
    }

    return (
        <>
            <Head>
                <title>Kleptonix | Sign In</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <KleptonixNavbar />

            <Container className="text-center pt-2">
                <Alert show={query.error === "not-found" ? true : false} variant="danger">
                    <Alert.Heading style={linkStyle}>
                        It would be wise to sign up before signing in.
                    </Alert.Heading>
                    <p>
                        An account with that email doesn't exist.
                    </p>
                </Alert>
                <Alert show={query.error === "wrong-password" ? true : false} variant="danger">
                    <Alert.Heading style={linkStyle}>
                        Whoops! Your password is wrong.
                    </Alert.Heading>
                    <p>
                        The password you entered doesn't match this account.
                    </p>
                </Alert>
                <Alert show={query.success === "account-created" ? true : false} variant="success">
                    <Alert.Heading style={linkStyle}>
                        You're all signed up!
                    </Alert.Heading>
                    <p>
                        You can now sign in with your new account.
                    </p>
                </Alert>
            </Container>

            <Container className="text-center pt-2">
                <h1 style={linkStyle}>Sign in with your <span style={brandStyle}>Kleptonix</span> account.</h1>
                <h4 style={brandStyle} className="text-muted">Access all the things.</h4>
            </Container>
            <Container className="pt-5">
                <Form action="/api/retrieve_account" method="POST">
                    <Form.Group className="mb-3" controlId="sign_up_email">
                        <Form.Label style={brandStyle}>Email address</Form.Label>
                        <Form.Control name="email" type="email" placeholder="luis@kleptonix.com" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="sign_up_password">
                        <Form.Label style={brandStyle}>Password</Form.Label>
                        <Form.Control name="password" type="password" placeholder="Password" required />
                    </Form.Group>
                    <Container className="text-center pt-2">
                        <Button style={brandStyle} variant="dark" type="submit">
                            Sign In
                        </Button>
                    </Container>
                </Form>
            </Container>
        </>
    )
}