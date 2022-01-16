import Head from "next/head"
import KleptonixNavbar from "../components/navbar"

export default SignIn => {
    return (
        <>
            <Head>
                <title>Kleptonix | Sign In</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <KleptonixNavbar />

            <h1>Sign In</h1>
        </>
    )
}