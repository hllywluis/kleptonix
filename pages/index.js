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

      <Container className="text-center">
        <h1>What were you expecting?</h1>
        <h2>There is literally nothing to see here.</h2>
        <h4 className="text-muted">But if you're patient, you might see a completely new Kleptonix rebuilt in Next using Prisma running on a Raspberry Pi.</h4>
        <h6 className="text-muted">I ditched the illegible old font for something you can actually read, too.</h6>
        <h3>Go back to Google or something and let me live in peace! 😤</h3>
      </Container>
    </>
  )
}
