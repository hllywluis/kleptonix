import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { retrieve_user } from "../tools/retrieve_user"

import Head from "next/head"
import Card from "react-bootstrap/Card"
import Container from "react-bootstrap/Container"
import KleptonixNavbar from "../components/navbar"
import { linkStyle } from "../styles/linkStyle"
import { brandStyle } from "../styles/brandStyle"
import { Carousel } from "react-bootstrap"

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
