import { NextPageContext } from "next"
import Head from "next/head"
import Container from "react-bootstrap/Container"

interface ErrorProps {
  statusCode?: number
}

function Error({ statusCode }: ErrorProps) {
  return (
    <>
      <Head>
        <title>Error | Kleptonix</title>
      </Head>
      <Container className="text-center py-5">
        <h1 className="display-4">Oops! Something went wrong</h1>
        <p className="lead">
          {statusCode
            ? `An error ${statusCode} occurred on server`
            : "An error occurred on client"}
        </p>
        <hr className="my-4" />
        <p>
          We're working on fixing this. Please try refreshing the page or come
          back later.
        </p>
      </Container>
    </>
  )
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
