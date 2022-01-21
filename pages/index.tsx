import { useSession } from "next-auth/react"

import Head from 'next/head'
import Container from 'react-bootstrap/Container'
import KleptonixNavbar from '../components/navbar'

export async function getServerSideProps() {
  const prisma = require("../prisma/prisma")
  
  const posts = await prisma.posts?.findMany()

  if (posts) {
    return {
    props: { posts }
    }
  } else {
    return {
      props: { posts: {} }
    }
  }
  
}

export default function Home({ posts }) {
  const { data: session } = useSession()

  const brandStyle = {
    fontFamily: "Bangers, sans-serif"
  }

  const linkStyle = {
    fontFamily: "Staatliches, serif"
  }

  if (posts) {
    return (
      <>
        <Head>
          <title>Kleptonix | Home</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <KleptonixNavbar />

        <Container className="text-center pt-2">
          {session ? (
            <h1 style={linkStyle}>Welcome to <span style={brandStyle}>Kleptonix</span>, {session.user.dname ?? " human"}</h1>
          ) : (
            <h1 style={linkStyle}>Welcome to <span style={brandStyle}>Kleptonix</span></h1>
          )}
          <h4 style={brandStyle} className="text-muted">There aren't any posts yet</h4>
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

        <KleptonixNavbar />

        <Container className="text-center pt-2">
          <h1 style={linkStyle}>Welcome to <span style={brandStyle}>Kleptonix</span></h1>
          <h4 style={brandStyle} className="text-muted">There's no place like it</h4>
        </Container>
      </>
    )
  }
}
