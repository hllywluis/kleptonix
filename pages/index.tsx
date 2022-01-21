import { useSession } from "next-auth/react"
import { retrieve_user } from "../tools/retrieve_user"

import Head from "next/head"
import Container from "react-bootstrap/Container"
import KleptonixNavbar from "../components/navbar"
import { linkStyle } from "../styles/linkStyle"
import { brandStyle } from "../styles/brandStyle"

export async function getServerSideProps(req) {
  return retrieve_user(req)
}

export default function Home({ user }) {
  const { data: session } = useSession()
  const posts = {}

  if (posts) {
    return (
      <>
        <Head>
          <title>Kleptonix | Home</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <KleptonixNavbar user={user} />

        <Container className="text-center pt-2">
          {session ? (
            <h1 style={linkStyle}>How are ya, {user.dname}?</h1>
          ) : (
            <h1 style={linkStyle}>
              Welcome to <span style={brandStyle}>Kleptonix</span>
            </h1>
          )}
          <h4 style={brandStyle} className="text-muted">
            There aren't any posts yet
          </h4>
        </Container>
      </>
    )
  } else {
    return (
      <>
        <Head>
          <title>Kleptonix | Home</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <KleptonixNavbar user={user} />

        <Container className="text-center pt-2">
          <h1 style={linkStyle}>
            Welcome to <span style={brandStyle}>Kleptonix</span>
          </h1>
          <h4 style={brandStyle} className="text-muted">
            There's no place like it
          </h4>
        </Container>
      </>
    )
  }
}
