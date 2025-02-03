import { memo } from 'react'
import Card from 'react-bootstrap/Card'
import { ErrorBoundary } from './ErrorBoundary'
import Markdown from './Markdown'
import styles from '../styles/PostCard.module.css'
import type { PostCardProps } from '../types/components'

const PostCard = memo(
  ({
    title,
    author,
    username,
    klepton,
    text,
    views,
    replies,
    className,
  }: PostCardProps): JSX.Element => {
    const handleReport = (): void => {
      // TODO: Implement report functionality
      console.log('Report clicked for post:', title)
    }

    return (
      <ErrorBoundary>
        <Card className={`${styles.card} ${className ?? ''}`}>
          <Card.Body>
            <div className="text-center">
              <Card.Title className={styles.title}>
                <h4>{title}</h4>
              </Card.Title>
              <Card.Subtitle className={styles.subtitle}>
                {author} - @{username} - k/{klepton}
              </Card.Subtitle>
            </div>
            <hr />
            <div className={styles.content}>
              <Markdown content={text} />
            </div>
          </Card.Body>
          <Card.Footer className={styles.footer}>
            <span className={styles.footerText}>
              {views} {views === 1 ? 'view' : 'views'}
            </span>
            <span className={styles.footerText}>
              {replies} {replies === 1 ? 'Reply' : 'Replies'}
            </span>
            <span
              className={`${styles.footerText} ${styles.reportButton}`}
              onClick={handleReport}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleReport()
                }
              }}
            >
              Report
            </span>
          </Card.Footer>
        </Card>
      </ErrorBoundary>
    )
  }
)

PostCard.displayName = 'PostCard'

export default PostCard
