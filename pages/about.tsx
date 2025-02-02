import Head from "next/head"
import Link from "next/link"
import { GetServerSideProps } from "next"
import { retrieve_user } from "../tools/retrieve_user"
import Container from "react-bootstrap/Container"
import Stack from "react-bootstrap/Stack"
import KleptonixNavbar from "../components/navbar"
import styles from "../styles/About.module.css"
import type { User } from "../types/components"

interface AboutProps {
  user: User
  owner: User
}

const defaultOwner: User = {
  id: 1,
  dname: "luis",
  email: "luis@kleptonix.com",
  password: "",
  subs: [],
  hidename: false,
  name: "Luis Bauza",
}

const defaultUser: User = {
  id: 0,
  email: "",
  password: "",
  subs: [],
  dname: null,
  hidename: null,
  name: null,
}

export const getServerSideProps: GetServerSideProps<AboutProps> = async (
  context
) => {
  let owner = defaultOwner
  let user = defaultUser

  try {
    const userProps = await retrieve_user(context)
    if (userProps?.props?.user) {
      user = userProps.props.user
    }

    try {
      const client = require("../prisma/prisma")
      const { prisma } = client
      const ownerEmail = "luis@kleptonix.com"

      const dbOwner = await prisma.user?.findUnique({
        where: {
          email: ownerEmail,
        },
      })

      if (dbOwner) {
        owner = dbOwner
      }
    } catch (error) {
      console.error(
        "Database connection failed, using default owner data:",
        error
      )
    }
  } catch (error) {
    console.error("Error in getServerSideProps:", error)
  }

  return {
    props: {
      user,
      owner,
    },
  }
}

export default function About({ user, owner }: AboutProps) {
  return (
    <>
      <Head>
        <title>Kleptonix | About{user.dname ? ` | @${user.dname}` : ""}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <KleptonixNavbar user={user} />

      <Container className="text-center pt-2">
        <h1 className={styles.title}>
          About <span className={styles.brand}>Kleptonix</span>
        </h1>
        <h4 className={`${styles.brand} text-muted`}>
          Developed with TLC from SoFlo
        </h4>
      </Container>

      <Container className="pt-4">
        <Stack direction="horizontal" gap={3}>
          <h2 className={styles.title}>Where Developers Come to Gather</h2>
        </Stack>
        <hr />
        <p>
          It's not usually the case that a website has a personal about section
          based on the developer or team that built it, but this site has a lot
          of personal meaning to me. Ever since I came up with the idea of a
          "Reddit Clone" as a personal project of mine, I never thought much of
          it. As time went on, though, I started making progress. Soon enough, I
          was hooked on the idea of adding new features and learning about the
          interesting programming language that is JavaScript. To be honest, I
          didn't even really know what I was doing or what the site I was
          building would eventually become. In time, I settled on the idea of
          making a "portfolio" site, like many other software developers. But
          there's something wrong with that approach in my eyes. Why make a site
          solely dedicated on showing off <em>your</em> accomplishments? Why not
          make a site that is a <em>community</em> for developers to learn from
          each other?
          <br />
          <br />
          That's my goal for what{" "}
          <span className={styles.brand}>Kleptonix</span> will become. Not
          necessarily a rival to Stack Overflow, but a community that anyone can
          join and contribute to.
        </p>
      </Container>

      <Container className="pt-4">
        <Stack direction="horizontal" gap={3}>
          <h2 className={styles.title}>The Team</h2>
        </Stack>
        <hr />
        <p>
          <span className={styles.brand}>Kleptonix</span> is made by your
          friendly neighborhood developer,{" "}
          <Link
            href="https://linkedin.com/in/hllywluis"
            className={styles.link}
          >
            {owner.dname ? "@" + owner.dname : "@luis"}
          </Link>
          . He's a software engineer, a web developer, and a lifelong computer
          science student. He's a pretty cool guy.
        </p>
      </Container>
    </>
  )
}
