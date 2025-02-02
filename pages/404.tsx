import Head from "next/head"
import Link from "next/link"
import Container from "react-bootstrap/Container"
import KleptonixNavbar from "../components/navbar"
import type { User } from "../types/components"

const defaultUser: User = {
  id: 0,
  email: "",
  password: "",
  subs: [],
  dname: null,
  hidename: null,
  name: null,
}

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 - Page Not Found | Kleptonix</title>
      </Head>

      <KleptonixNavbar user={defaultUser} />

      <Container className="text-center py-5">
        <h1 className="display-4">404 - Page Not Found</h1>
        <p className="lead">Oops! The page you're looking for doesn't exist.</p>
        <hr className="my-4" />
        <p>
          Don't worry, you can find your way back to our community through these
          links:
        </p>
        <div className="mt-4">
          <Link href="/" className="btn btn-primary me-3">
            Go Home
          </Link>
          <Link href="/kleptons" className="btn btn-outline-primary">
            Browse Kleptons
          </Link>
        </div>
      </Container>
    </>
  )
}
