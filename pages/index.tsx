import Link from "next/link"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { retrieve_user } from "../tools/retrieve_user"

import Head from "next/head"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"

import KleptonixNavbar from "../components/navbar"
import Postcard from "../components/postcard"
import { linkStyle } from "../styles/linkStyle"
import { brandStyle } from "../styles/brandStyle"

export async function getServerSideProps(req) {
  return retrieve_user(req)
}

export default function Home({ user }) {
  const showdown = require("showdown")
  const converter = new showdown.Converter({
    strikethrough: true,
    omitExtraWLInCodeBlocks: true,
  })

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
            <Container className="my-auto pt-2">
              <div className="row">
                <div className="col-md-6 py-2">
                  <Postcard
                    title="Welcome to Kleptonix"
                    author="Luis Bauza"
                    username="luis"
                    klepton="kleptonix"
                    text={converter.makeHtml(
                      "##### Make yourself at home!\n" +
                        'Kleptonix allows developers (like you and I) to quickly and easily get in touch with others to create something new. Communities are denoted by "Kleptons," and each Klepton has a different topic. It fits in with the site\'s name, after all!\n' +
                        "##### How do I subscribe to a Klepton?\n" +
                        "You'll first want to head to the Klepton's page. Since this website is under construction, Kleptons themselves haven't been implemented yet.\n" +
                        "##### When will the website be finished?\n" +
                        "There's always something new to add or a bug to fix. I don't anticipate development ever finishing but most functionality should be implemented within the next few years (this is a side project, after all)."
                    )}
                    views={1}
                    replies={1}
                  />
                </div>
                <div className="col-md-6 py-2">
                  <Postcard
                    title="The Beauty of JavaScript"
                    author="John Doe"
                    username="jdoe"
                    klepton="javascript"
                    text={converter.makeHtml(
                      "##### What is JavaScript?\n" +
                        'JavaScript is a programming language designed to make your life easier. In fact, this website is made using a subset of JavaScript called TypeScript. You can think of it like an "extension" of JavaScript that allows for more control over types and keeps applications running more reliably.\n' +
                        "##### Why should I care?\n" +
                        "In addition to being one of the most widely used languages on the Web, JavaScript is also used for certain desktop applications. Node.js allows developers to create desktop applications using JavaScript. Making web applications becomes much easier and faster using this language. If this website is made using JavaScript, just imagine what you might be able to create using it!"
                    )}
                    views={0}
                    replies={0}
                  />
                </div>
              </div>
            </Container>
            <Container className="my-auto">
              <div className="row">
                <div className="col py-2">
                  <Postcard
                    title="Python is Cool"
                    author="Bryan Grigorie"
                    username="bgregz"
                    klepton="python"
                    text={converter.makeHtml(
                      "##### What is Python?\n" +
                        "Python is one of the most popular programming languages. It's used to make Flask applications, and it's used to make Django applications. I use it everyday at work, and I've also made Django apps in the past for school.\n" +
                        "##### Why is Python so popular?\n" +
                        "You'll probably use Python in your job too, if you're not already using it. It's a great language to learn, and it's a great language to use. I've used Python for a lot of things, and I'm pretty sure I'll use it again. It's one of those languages that I don't think will ever die down in popularity, unless something even more efficient becomes available.\n\n" +
                        "For those that are still learning programming, Python is a great starter language."
                    )}
                    views={0}
                    replies={0}
                  />
                </div>
              </div>
            </Container>
            <Container className="my-auto">
              <div className="row">
                <div className="col-md-6 py-2">
                  <Postcard
                    title="Rust is Uncool"
                    author="John Doe"
                    username="jdoe"
                    klepton="rust"
                    text={converter.makeHtml(
                      "##### What is Rust?\n" +
                        "Rust is a programming language. We don't need to talk about it."
                    )}
                    views={0}
                    replies={0}
                  />
                </div>
              </div>
            </Container>
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
