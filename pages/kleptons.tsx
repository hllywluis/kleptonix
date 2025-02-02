import Head from 'next/head'
import { retrieve_user } from '../tools/retrieve_user'

import Kard from 'components/kard'
import KleptonixNavbar from 'components/navbar'

export async function getServerSideProps(req) {
  return retrieve_user(req)
}

export default function Kleptons({ user }) {
  const java_url =
    'https://images.unsplash.com/photo-1585332889055-059af80a9b5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1664&q=80'
  const rust_url =
    'https://images.unsplash.com/photo-1612174194811-0ab2ce2fb492?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80'
  const python_url =
    'https://images.unsplash.com/photo-1528158222524-d4d912d2e208?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2880&q=80'
  const js_url =
    'https://images.unsplash.com/photo-1576836165612-8bc9b07e7778?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80'
  const k_url =
    'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80'

  return (
    <>
      <Head>
        <title>Kleptonix | Kleptons</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <KleptonixNavbar user={user} />

      <Kard
        name="Kleptonix"
        description="The only Klepton that keeps you up to date about current development for the site. Come take a sneak peek at the most recent changes and new features coming to a future release of Kleptonix!"
        member_string="Klepters"
        member_count={1}
        post_string="Posts"
        post_count={1}
        img_url={k_url}
      />

      <Kard
        name="Java"
        description={`Some people might say that Java is a programming language that exists, but we here at *k/java* don't believe such blatant lies. We know the truth, and the truth is that this so-called programming language is actually a horribly un-optimized version of C. You can't change our minds, but you can stop right in to chat about what you had for coffee in the morning. We won't judge (unless you really think Java is a real language), *we promise*.`}
        member_string="Coffee Drinkers"
        member_count={4}
        post_string="Posts"
        post_count={1}
        img_url={java_url}
      />

      <Kard
        name="JavaScript"
        description="The language *Kleptonix* is built on. Anything JavaScript and framework related belongs here."
        member_string="Script Kiddies"
        member_count={4}
        post_string="Posts"
        post_count={1}
        img_url={js_url}
      />

      <Kard
        name="Rust"
        description={`Feelin' a little Rusty on Rust? Talk all about the leading Data Science programming language here. It's apparently even used in Web Development, and much more!`}
        member_string="Metalheads"
        member_count={4}
        post_string="Posts"
        post_count={1}
        img_url={rust_url}
      />

      <Kard
        name="Python"
        description={`Python is the most widely used language in the world. It's not only used for Data Science, but also for Web Development, and even for Machine Learning. It's also used to make videogames, such as the famous *Doki Doki Literature Club*, which uses a library called *RenPy* for visual novels. There are so many ways to use Python, that we can't wait what the community can come up with!`}
        member_string="Pythonistas"
        member_count={4}
        post_string="Posts"
        post_count={1}
        img_url={python_url}
      />
    </>
  )
}
