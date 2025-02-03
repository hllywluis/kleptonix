import Head from 'next/head'
import type { GetServerSidePropsContext } from 'next'
import { retrieve_user } from '../tools/retrieve_user'

import Kard from 'components/kard'
import KleptonixNavbar from 'components/navbar'
import { kleptonConfigs } from 'data/kleptons'
import type { User } from 'types/components'

export async function getServerSideProps(req: GetServerSidePropsContext) {
  return retrieve_user(req)
}

interface KleptonsProps {
  user: User | null
}

export default function Kleptons({ user }: KleptonsProps) {
  return (
    <>
      <Head>
        <title>Kleptonix | Kleptons</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <KleptonixNavbar user={user} />

      {Object.entries(kleptonConfigs).map(([key, config]) => (
        <Kard
          key={key}
          name={config.name}
          description={config.description}
          member_string={config.member_string}
          member_count={config.member_count}
          post_string="Posts"
          post_count={1}
          img_url={config.img_url}
        />
      ))}
    </>
  )
}
