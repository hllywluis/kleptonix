import Head from "next/head"
import KleptonixNavbar from "../components/navbar"

export default SignUp => {
    return (
        <>
            <Head>
                <title>Kleptonix | Sign Up</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <KleptonixNavbar />

            <h1>Sign Up</h1>
        </>
    )
}