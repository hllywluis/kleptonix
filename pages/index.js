import Head from 'next/head'
import Container from 'react-bootstrap/Container'
import KleptonixNavbar from '../components/navbar'

export default Home => {
  return (
    <>
      <Head>
        <title>Kleptonix | Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <KleptonixNavbar />

      <Container className="text-center pt-2">
        <h1>Welcome to Kleptonix.</h1>
        <h4 className="text-muted">There's no place like it.</h4>
      </Container>
    </>
  )
}
