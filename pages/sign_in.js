import Head from "next/head"
import Container from "react-bootstrap/Container"
import KleptonixNavbar from "../components/navbar"

export default SignIn => {
    return (
        <>
            <Head>
                <title>Kleptonix | Sign In</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <KleptonixNavbar />

            <Container className="text-center">
                <h1>This is not at all a Sign In page.</h1>
                <h2>In fact, it's just a blank page with some text on it.</h2>
                <h4 className="text-muted">Why are you still here?</h4>
            </Container>
        </>
    )
}