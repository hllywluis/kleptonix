import Head from "next/head"
import Container from "react-bootstrap/Container"
import KleptonixNavbar from "../components/navbar"

export default SignUp => {
    return (
        <>
            <Head>
                <title>Kleptonix | Sign Up</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <KleptonixNavbar />

            <Container className="text-center">
                <h1>This is not, in fact, a Sign Up page.</h1>
                <h2>It's just another blank page. And so, Sherlock Holmes is stumped once again.</h2>
                <h4 className="text-muted">Do you ever get collector's anxiety?</h4>
            </Container>
        </>
    )
}