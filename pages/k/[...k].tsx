import Head from "next/head"
import { useRouter } from "next/router"

import KleptonixNavbar from "components/navbar"

import { retrieve_user } from "tools/retrieve_user"

export async function getServerSideProps(req) {
  return retrieve_user(req)
}

export default function Klepton({ user }) {
  const router = useRouter()
  const { k } = router.query

  return (
    <>
      <Head>
        <title>Kleptonix | {k}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <KleptonixNavbar user={user} />

      <h1>{k}</h1>
    </>
  )
}
