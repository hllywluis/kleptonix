import Head from 'next/head'
import { useRouter } from 'next/router'
import { Container, Row, Col } from 'react-bootstrap'
import type { GetServerSidePropsContext } from 'next'

import KleptonixNavbar from 'components/navbar'
import PostCard from 'components/postcard'
import Kard from 'components/kard'
import { defaultPosts } from 'data/posts'
import { getKleptonConfig } from 'data/kleptons'
import { retrieve_user } from 'tools/retrieve_user'
import type { User } from 'types/components'

export async function getServerSideProps(req: GetServerSidePropsContext) {
  return retrieve_user(req)
}

interface KleptonProps {
  user: User | null
}

export default function Klepton({ user }: KleptonProps) {
  const router = useRouter()
  const { k } = router.query
  const klepton = Array.isArray(k) ? k[0] : k || ''

  // Filter posts for the current klepton
  const filteredPosts = defaultPosts.filter((post) => post.klepton === klepton)
  const currentKlepton = getKleptonConfig(klepton)

  return (
    <>
      <Head>
        <title>{`Kleptonix | k/${klepton}`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <KleptonixNavbar user={user} />

      <Container className="mt-4">
        <Kard
          name={currentKlepton.name}
          description={currentKlepton.description}
          member_string={currentKlepton.member_string}
          member_count={currentKlepton.member_count}
          post_string="Posts"
          post_count={filteredPosts.length}
          img_url={currentKlepton.img_url}
        />

        <Row xs={1} md={2} lg={3} className="g-4 mt-4">
          {filteredPosts.map((post) => (
            <Col key={post.id}>
              <PostCard
                title={post.title}
                author={post.author}
                username={post.username}
                klepton={post.klepton}
                text={post.text}
                views={post.views}
                replies={post.replies}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  )
}
