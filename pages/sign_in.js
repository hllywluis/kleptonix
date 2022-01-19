import Head from "next/head"
import { useState } from "react"
import { useRouter } from "next/router"
import { useSession, signIn } from "next-auth/react"

import Alert from "react-bootstrap/Alert"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import KleptonixNavbar from "../components/navbar"

export default SignIn => {
    const { data: session } = useSession()
    const { query } = useRouter()

    const [email, updateEmail] = useState("")
    const [password, updatePassword] = useState("")

    const brandStyle = {
        fontFamily: "Bangers, sans-serif"
    }

    const linkStyle = {
        fontFamily: "Staatliches, serif"
    }

    if (session) {
        return (
            <>
                <Head>
                    <title>Kleptonix | Secret</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <KleptonixNavbar />

                <Container className="text-center pt-2">
                    <Alert variant="secondary">
                        <Alert.Heading style={linkStyle}>You're already signed in.</Alert.Heading>
                        <p>
                            But thanks for the thought. Here's an easter egg for you.
                        </p>
                    </Alert>
                </Container>
            </>
        )
    } else {
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
                            <Form.Control name="email" type="email" placeholder="luis@kleptonix.com" onChange={email => updateEmail(email.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="sign_up_password">
                            <Form.Label style={brandStyle}>Password</Form.Label>
                            <Form.Control name="password" type="password" placeholder="Password" onChange={password => updatePassword(password.target.value)} required />
                        </Form.Group>
                        <Container className="text-center pt-2">
                            {!session && (
                                <Button style={brandStyle} variant="dark" onClick={() => signIn("credentials", { email: email, password: password, callbackUrl: "/" })}>
                                    Sign In
                                </Button>
                            )}
                        </Container>
                    </Form>
                </Container>
            </>
        )
    }
}