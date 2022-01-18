import Head from "next/head"

import Alert from "react-bootstrap/Alert"
import Container from "react-bootstrap/Container"
import KleptonixNavbar from "../components/navbar"

export default SignIn => {

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
            </Container>

            <Container className="text-center pt-2">
                <h1 style={linkStyle}>Sign in with your <span style={brandStyle}>Kleptonix</span> account.</h1>
                <h4 style={brandStyle} className="text-muted">Access all the things.</h4>
            </Container>
        </>
    )
}