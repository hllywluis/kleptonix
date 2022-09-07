import Link from "next/link"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { retrieve_user } from "../tools/retrieve_user"

import Head from "next/head"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"

import Grid from "../layouts/grid"
import KleptonixNavbar from "../components/navbar"
import Postcard from "../components/postcard"
import { linkStyle } from "../styles/linkStyle"
import { brandStyle } from "../styles/brandStyle"

export async function getServerSideProps(req) {
  return retrieve_user(req)
}

export default function Home({ user }) {
  const { data: session } = useSession()
  const [currentGreeting, setCurrentGreeting] = useState("")
  const _ = require("lodash")
  const posts = {}

  const greetings = [
    `How are ya, ${user.dname}?`,
    `How's it going, ${user.dname}?`,
    `What's up, ${user.dname}?`,
    `How's life, ${user.dname}?`,
    `Let's get this bread, ${user.dname}!`,
    `Make it so, ${user.dname}!`,
    `Awesomesauce, ${user.dname}!`,
    `${user.dname}, you're the best!`,
    `Great to see you, ${user.dname}!`,
    `Now you're in the know, ${user.dname}!`,
    `Welcome back, ${user.dname}!`,
    `Very nice to see you, ${user.dname}!`,
    `Positive vibes, ${user.dname}!`,
    `Whatcha up to, ${user.dname}?`,
    `Tryna get some work done, ${user.dname}?`,
    `All your base are belong to us, ${user.dname}!`,
    `${user.dname}, I am your father!`,
    `Where are you, ${user.dname}?`,
    `Are you still there, ${user.dname}?`,
    `From the depths of the ocean, ${user.dname}!`,
    `Hunger is a real thing, ${user.dname}!`,
    `Take a break, ${user.dname}!`,
    `Looks like you're having a good day, ${user.dname}!`,
    `${user.dname}, you're a real gem!`,
    `${user.dname}, you're a real star!`,
    `Blessed are you, ${user.dname}!`,
    `As the prophecy foretold, ${user.dname}!`,
    `Where's the beef, ${user.dname}?`,
    `Uh, ${user.dname}, what's up?`,
    `Greetings, ${user.dname}!`,
    `Now you're in my heart, ${user.dname}!`,
    `How many messages are there, ${user.dname}?`,
    `Here's an easter egg messsage, ${user.dname}!`,
    `Create what you love, ${user.dname}!`,
    `Development is a beautiful thing, ${user.dname}!`,
    `Software is a wonderful thing, ${user.dname}!`,
    `What's the deal, ${user.dname}?`,
  ]

  useEffect(() => {
    if (_.isEmpty(currentGreeting)) {
      setCurrentGreeting(
        session ? greetings[_.random(0, greetings.length - 1)] : ""
      )
    }
  }, [session])

  if (_.isEmpty(posts)) {
    return (
      <>
        <Head>
          <title>Kleptonix | Home{user.dname ? ` | @${user.dname}` : ""}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <KleptonixNavbar user={user} />

        <Container className="py-2" fluid>
          {session && (
            <h1 className="text-center" style={linkStyle}>
              {currentGreeting}
            </h1>
          )}
          <>
            {!session && (
              <>
                <Container className="py-2 pb-4">
                  <div
                    id="main-jumbotron"
                    className="h-100 p-5 bg-light border rounded-3"
                  >
                    <Container className="py-2" fluid>
                      <div className="row text-white">
                        <div className="col">
                          <h1 className="display-6 pb-2 fw-bold">
                            Code? It's in our DNA.
                          </h1>
                          <p className="col-md-8 fs-4">
                            Where developers, engineers, and computer science
                            students gather to talk and share about their
                            favorite technologies. Start off the day with a bit
                            of Rust, and end it with some Nim. We won't judge!
                          </p>
                          <Link href="/sign_up">
                            <Button className="btn btn-secondary">
                              Join the Conversation
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </Container>
                  </div>
                </Container>
                <h1 style={linkStyle} className="text-center">
                  Featured Conversations
                </h1>
              </>
            )}

            {/* TODO: Add post functionality below this comment. */}
            <Grid />
          </>
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
          {session ? (
            <h1 style={linkStyle}>{currentGreeting}</h1>
          ) : (
            <h1 style={linkStyle}>
              Welcome to <span style={brandStyle}>Kleptonix</span>
            </h1>
          )}
          {!session && (
            <h4 style={brandStyle} className="text-muted">
              There's no place like it
            </h4>
          )}
        </Container>
      </>
    )
  }
}
