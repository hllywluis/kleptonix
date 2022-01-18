import Head from 'next/head'
import Container from 'react-bootstrap/Container'
import KleptonixNavbar from '../components/navbar'

export default Home => {

  const brandStyle = {
    fontFamily: "Bangers, sans-serif"
  }

  const linkStyle = {
    fontFamily: "Staatliches, serif"
  }

  return (
    <>
      <Head>
        <title>Kleptonix | Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <KleptonixNavbar />

      <Container className="text-center pt-2">
        <h1 style={linkStyle}>Welcome to <span style={brandStyle}>Kleptonix</span>.</h1>
        <h4 style={brandStyle} className="text-muted">There's no place like it.</h4>
      </Container>
    </>
  )
}
