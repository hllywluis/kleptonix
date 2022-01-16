import Head from 'next/head'

import KleptonixNavbar from '../components/navbar'

export default Home => {
  return (
    <>
      <Head>
        <title>Kleptonix | Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <KleptonixNavbar />
    </>
  )
}
