import Head from "next/head"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"

import Alert from "react-bootstrap/Alert"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Stack from "react-bootstrap/Stack"
import KleptonixNavbar from "../components/navbar"

export default Profile => {
    const { data: session } = useSession()
    const { query } = useRouter()

    const [username, setUsername] = useState("")
    const [changingUsername, setChangingUsername] = useState(false)

    const brandStyle = {
        fontFamily: "Bangers, sans-serif"
    }

    const linkStyle = {
        fontFamily: "Staatliches, serif"
    }

    const stop_setting_username = () => {
        setChangingUsername(false)
        setUsername(session.user.dname)
    }

    useEffect(() => {
        if (session) {
            setUsername(session.user.dname)
        }
    }, [session])

    if (session) {
        return (
            <>
                <Head>
                    <title>Kleptonix | Profile</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <KleptonixNavbar />

                <Container className="text-center pt-2">
                    <h1 style={linkStyle}>{session.user.dname ?? "human"}'s Profile</h1>
                    <h4 style={brandStyle} className="text-muted">Update all your settings, maybe take a break</h4>
                </Container>

                <Container className="pt-2">
                    <h1 style={brandStyle}>General Settings</h1>
                    <hr />
                    <Stack direction="horizontal" gap={3}>
                        <h2 className="my-auto" style={linkStyle}>Username:</h2>
                        <Form.Control className="me-auto" name="username" value={username} onChange={username => setUsername(username.target.value)} disabled={!changingUsername} />
                        {!changingUsername ? (
                            <Button variant="outline-secondary" disabled={changingUsername} onClick={() => setChangingUsername(true)}>Edit</Button>
                        ) : (
                            <Button variant="outline-danger" disabled={!changingUsername} onClick={() => stop_setting_username()}>Cancel</Button>
                        )}
                        <div className="vr" />
                        <Button variant="primary" disabled={!changingUsername}>Submit</Button>
                    </Stack>
                </Container>
            </>
        )
    } else {
        return (
            <>
                <Head>
                    <title>Kleptonix | No.</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <KleptonixNavbar />

                <Container className="text-center pt-2">
                    <Alert show={query.error ? true : false} variant="danger">
                        <Alert.Heading style={linkStyle}>This is a simple warning that will be removed once protected routes are implemented.</Alert.Heading>
                    </Alert>
                </Container>
            </>
        )
    }
}