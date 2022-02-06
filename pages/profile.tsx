import Head from "next/head"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import { retrieve_user } from "../tools/retrieve_user"

import Alert from "react-bootstrap/Alert"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup"
import Stack from "react-bootstrap/Stack"
import KleptonixNavbar from "../components/navbar"
import { linkStyle } from "../styles/linkStyle"
import { brandStyle } from "../styles/brandStyle"

export async function getServerSideProps(req) {
  return retrieve_user(req)
}

export default function Profile({ user }) {
  const { data: session } = useSession()
  const { query } = useRouter()

  const [username, setUsername] = useState("")
  const [changingUsername, setChangingUsername] = useState(false)

  const stop_setting_username = () => {
    setChangingUsername(false)
    setUsername(user.dname)
  }

  useEffect(() => {
    if (session) {
      setUsername(user.dname)
    }
  }, [session])

  if (session) {
    return (
      <>
        <Head>
          <title>
            Kleptonix | Profile{user.dname ? ` | @${user.dname}` : ""}
          </title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <KleptonixNavbar user={user} />

        <Container className="text-center pt-2">
          <h1 style={linkStyle}>{user.dname ?? "human"}'s Profile</h1>
          <h4 style={brandStyle} className="text-muted">
            Update all your settings, maybe take a break
          </h4>
        </Container>

        <Container className="pt-2">
          <h1 style={brandStyle}>General Settings</h1>
          <hr />
          <Stack direction="horizontal" gap={3}>
            <h2 className="my-auto" style={linkStyle}>
              Username:
            </h2>
            <Form className="w-100" action="/api/update_account" method="POST">
              <Stack direction="horizontal" gap={3}>
                <InputGroup>
                  <InputGroup.Text id="at-sign">@</InputGroup.Text>
                  <Form.Control
                    className="me-auto"
                    name="dname"
                    value={username}
                    onChange={(username) => setUsername(username.target.value)}
                    disabled={!changingUsername}
                  />
                </InputGroup>
                {!changingUsername ? (
                  <Button
                    variant="outline-secondary"
                    disabled={changingUsername}
                    onClick={() => setChangingUsername(true)}
                  >
                    Edit
                  </Button>
                ) : (
                  <Button
                    variant="outline-danger"
                    disabled={!changingUsername}
                    onClick={() => stop_setting_username()}
                  >
                    Cancel
                  </Button>
                )}
                <div className="vr" />
                <Button
                  variant="primary"
                  disabled={!changingUsername}
                  type="submit"
                >
                  Submit
                </Button>
              </Stack>
            </Form>
          </Stack>
        </Container>
      </>
    )
  } else {
    return (
      <>
        <Head>
          <title>Kleptonix | No.</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <KleptonixNavbar user={{}} />

        <Container className="text-center pt-2">
          <Alert show={true} variant="danger">
            <Alert.Heading style={linkStyle}>
              You're not signed in.
            </Alert.Heading>
            <p>
              You need to sign in before you can access this page. You can sign
              in <Link href="/sign_in">here</Link>.
            </p>
          </Alert>
        </Container>
      </>
    )
  }
}
