import { SessionProvider } from "next-auth/react"

import "../styles/globals.css"
import "bootstrap/dist/css/bootstrap.min.css"

function Kleptonix({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default Kleptonix
