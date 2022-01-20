import Head from "next/head"
import Link from "next/link"

import Container from "react-bootstrap/Container"
import Stack from "react-bootstrap/Stack"
import KleptonixNavbar from "../components/navbar"

export default About => {

    const brandStyle = {
        fontFamily: "Bangers, sans-serif"
    }

    const linkStyle = {
        fontFamily: "Staatliches, serif"
    }

    return (
        <>
            <Head>
                <title>Kleptonix | About</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <KleptonixNavbar />

            <Container className="text-center pt-2">
                <h1 style={linkStyle}>About <span style={brandStyle}>Kleptonix</span></h1>
                <h4 style={brandStyle} className="text-muted">Developed with TLC from SoFlo</h4>
            </Container>

            <Container className="pt-4">
                <Stack direction="horizontal" gap={3}>
                    <h2 style={linkStyle}>Where Developers Come to Gather</h2>
                    <h4 style={brandStyle} className="text-muted">(And anyone else that's interested in Software Development too)</h4>
                </Stack>
                <hr />
                <p>
                    It's not usually the case that a website has a personal about section based on the developer or team that built it, but this site has a lot of personal meaning to me.
                    Ever since I came up with the idea of a "Reddit Clone" as a personal project of mine, I never thought much of it. As time went on, though, I started making progress.
                    Soon enough, I was hooked on the idea of adding new features and learning about the interesting programming language that is JavaScript. To be honest, I didn't even
                    really know what I was doing or what the site I was building would eventually become. In time, I settled on the idea of making a "portfolio" site, like many other
                    software developers. But there's something wrong with that approach in my eyes. Why make a site solely dedicated on showing off <em>your</em> accomplishments? Why
                    not make a site that is a <em>community</em> for developers to learn from each other?
                    <br />
                    <br />
                    That's my goal for what <span style={brandStyle}>Kleptonix</span> will become. Not necessarily a rival to Stack Overflow, but a community that anyone can join and contribute to.
                </p>
            </Container>

            <Container className="pt-4">
                <Stack direction="horizontal" gap={3}>
                    <h2 style={linkStyle}>The Team</h2>
                    <h4 style={brandStyle} className="text-muted">(AKA the people behind Kleptonix)</h4>
                </Stack>
                <hr />
                <p>
                    <span style={brandStyle}>Kleptonix</span> is made by your friendly neighborhood developer, <Link href="https://linkedin.com/in/hllywluis">@luis</Link>. He's a software engineer, a web developer, and a lifelong computer science student. He's a pretty cool guy.
                </p>
            </Container>
        </>
    )
}