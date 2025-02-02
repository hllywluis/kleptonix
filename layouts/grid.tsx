import { memo } from "react"
import { ErrorBoundary } from "../components/ErrorBoundary"
import Postcard from "../components/postcard"
import styles from "../styles/Grid.module.css"
import { defaultPosts } from "../data/posts"
import type { Post } from "../data/posts"

interface GridProps {
  posts?: Post[]
  loading?: boolean
  className?: string
}

const Grid = memo(
  ({
    posts = defaultPosts,
    loading = false,
    className,
  }: GridProps): JSX.Element => {
    if (loading) {
      return (
        <div
          className={`${styles.container} ${styles.loading} ${className ?? ""}`}
        >
          <div className={styles.grid}>
            {[...Array(4)].map((_, index) => (
              <div key={`skeleton-${index}`} className={styles.gridItem}>
                <div className="placeholder-glow">
                  <div
                    className="placeholder col-12 bg-secondary"
                    style={{ height: "200px" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }

    if (!posts.length) {
      return (
        <div className={`${styles.container} ${className ?? ""}`}>
          <div className={styles.error}>
            No posts found. Be the first to create one!
          </div>
        </div>
      )
    }

    return (
      <ErrorBoundary>
        <div className={`${styles.container} ${className ?? ""}`}>
          <div className={styles.grid}>
            {posts.map((post) => (
              <div key={post.id} className={styles.gridItem}>
                <Postcard
                  title={post.title}
                  author={post.author}
                  username={post.username}
                  klepton={post.klepton}
                  text={post.text}
                  views={post.views}
                  replies={post.replies}
                />
              </div>
            ))}
          </div>
        </div>
      </ErrorBoundary>
    )
  }
)

Grid.displayName = "Grid"

export default Grid
