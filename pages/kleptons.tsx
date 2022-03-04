import Head from "next/head"
import { useSession } from "next-auth/react"
import { retrieve_user } from "../tools/retrieve_user"

import Parse from "html-react-parser"

import Card from "react-bootstrap/Card"
import Container from "react-bootstrap/Container"

import KleptonixNavbar from "components/navbar"
import { linkStyle } from "styles/linkStyle"
import { brandStyle } from "styles/brandStyle"

export async function getServerSideProps(req) {
  return retrieve_user(req)
}

export default function Kleptons({ user }) {
  const { data: session } = useSession()
  const java_url =
    "https://images.unsplash.com/photo-1585332889055-059af80a9b5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1664&q=80"
  const rust_url =
    "https://images.unsplash.com/photo-1612174194811-0ab2ce2fb492?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"
  const python_url =
    "https://images.unsplash.com/photo-1528158222524-d4d912d2e208?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2880&q=80"
  const showdown = require("showdown")
  const converter = new showdown.Converter({
    strikethrough: true,
    omitExtraWLInCodeBlocks: true,
  })
  return (
    <>
      <Head>
        <title>Kleptonix | Kleptons</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <KleptonixNavbar user={user} />

      <Container className="text-center pt-2">
        <h1 style={linkStyle}>Kleptons</h1>
      </Container>

      <Container className="py-2">
        <div
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)), url(${java_url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="h-100 p-5 bg-light border rounded-3"
        >
          <Container className="py-2" fluid>
            <div className="row text-white">
              <div className="col">
                <p>k/</p>
                <h1 style={linkStyle} className="display-6 pb-2 fw-bold">
                  Java
                </h1>
                <p className="col-md-8 py-2 fs-4">
                  {Parse(
                    converter.makeHtml(
                      `Some people might say that Java is a programming language that exists, but we here at *k/java* don't believe such blatant lies. We know the truth, and the truth is that this so-called programming language is actually a horribly un-optimized version of C. You can't change our minds, but you can stop right in to chat about what you had for coffee in the morning. We won't judge (unless you really think Java is a real language), *we promise*.`
                    )
                  )}
                </p>
                <div className="row">
                  <div className="col">
                    <h5>
                      {Parse(converter.makeHtml("**Coffee Drinkers: 4**"))}
                    </h5>
                  </div>
                  <div className="col">
                    <h5>{Parse(converter.makeHtml("**Posts: 1**"))}</h5>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </Container>

      <Container className="py-2">
        <div
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)), url(${rust_url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="h-100 p-5 bg-light border rounded-3"
        >
          <Container className="py-2" fluid>
            <div className="row text-white">
              <div className="col">
                <p>k/</p>
                <h1 style={linkStyle} className="display-6 pb-2 fw-bold">
                  Rust
                </h1>
                <p className="col-md-8 py-2 fs-4">
                  {Parse(
                    converter.makeHtml(
                      `Feelin' a little Rusty on Rust? Talk all about the leading Data Science programming language here. It's apparently even used in Web Development, and much more!`
                    )
                  )}
                </p>
                <div className="row">
                  <div className="col">
                    <h5>{Parse(converter.makeHtml("**Metalheads: 4**"))}</h5>
                  </div>
                  <div className="col">
                    <h5>{Parse(converter.makeHtml("**Posts: 1**"))}</h5>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </Container>

      <Container className="py-2">
        <div
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)), url(${python_url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="h-100 p-5 bg-light border rounded-3"
        >
          <Container className="py-2" fluid>
            <div className="row text-white">
              <div className="col">
                <p>k/</p>
                <h1 style={linkStyle} className="display-6 pb-2 fw-bold">
                  Python
                </h1>
                <p className="col-md-8 py-2 fs-4">
                  {Parse(
                    converter.makeHtml(
                      `Python is the most widely used language in the world. It's not only used for Data Science, but also for Web Development, and even for Machine Learning. It's also used to make videogames, such as the famous *Doki Doki Literature Club*, which uses a library called *RenPy* for visual novels. There are so many ways to use Python, that we can't wait what the community can come up with!`
                    )
                  )}
                </p>
                <div className="row">
                  <div className="col">
                    <h5>{Parse(converter.makeHtml("**Sneks: 4**"))}</h5>
                  </div>
                  <div className="col">
                    <h5>{Parse(converter.makeHtml("**Posts: 1**"))}</h5>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </Container>
    </>
  )
}
