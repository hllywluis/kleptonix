import Head from "next/head"
import { useState } from "react"

import Alert from "react-bootstrap/Alert"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import KleptonixNavbar from "../components/navbar"

export default SignUp => {

    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [passwordError, setPasswordError] = useState(false)

    const checkPassword = (password, confirmPassword) => {
        if (password === confirmPassword) {
            return false
        } else {
            return true
        }
    }

    return (
        <>
            <Head>
                <title>Kleptonix | Sign Up</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <KleptonixNavbar />

            <Container className="pt-2" fluid>
                <Alert show={passwordError} variant="danger" onClose={() => setPasswordError(false)} dismissible>
                    <Alert.Heading>Did you type your password in properly?</Alert.Heading>
                    <p>
                        Your password confirmation doesn't match your password. Please try again.
                    </p>
                </Alert>
            </Container>

            <Container className="text-center pt-2">
                <h1>Create your Kleptonix account here.</h1>
                <h4 className="text-muted">It's free and always will be.</h4>
            </Container>
            <Container className="pt-5">
                <Form>
                    <Form.Group className="mb-3" controlId="sign_up_email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="luis@kleptonix.com" required />
                        <Form.Text className="text-muted">
                            You'll need it in case you forget your password.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="sign_up_password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={password => setPassword(password.target.value)} required />
                        <Form.Text className="text-muted">
                            Make it secure, and make sure you remember it.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="sign_up_password_confirmation">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm Password" onChange={confirmPassword => setConfirmPassword(confirmPassword.target.value)} required />
                        <Form.Text className="text-muted">
                            Confirm your password.
                        </Form.Text>
                    </Form.Group>
                    <Container className="text-center pt-2">
                        <Button variant="dark" onClick={() => setPasswordError(checkPassword(password, confirmPassword))}>
                            Sign Up
                        </Button>
                    </Container>
                </Form>
            </Container>
        </>
    )
}