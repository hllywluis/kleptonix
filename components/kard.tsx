import { memo } from "react"
import Link from "next/link"
import Container from "react-bootstrap/Container"
import { ErrorBoundary } from "./ErrorBoundary"
import Markdown from "./Markdown"
import styles from "../styles/Kard.module.css"
import type { KardProps } from "../types/components"

const Kard = memo(
  ({
    name,
    description,
    member_string,
    member_count,
    post_string,
    post_count,
    img_url,
    className,
  }: KardProps): JSX.Element => {
    return (
      <ErrorBoundary>
        <Container className={`${styles.container} ${className ?? ""}`}>
          <div
            className={styles.card}
            style={{ backgroundImage: `url(${img_url})` }}
          >
            <div className={styles.overlay} />
            <div className={styles.content}>
              <p className={styles.prefix}>k/</p>
              <h1 className={styles.title}>
                <Link href={`/k/${name.toLowerCase()}`}>
                  <span className={styles.titleLink}>{name}</span>
                </Link>
              </h1>
              <div className={styles.description}>
                <Markdown content={description} />
              </div>
              <div className={styles.stats}>
                <div className={styles.stat}>
                  <Markdown content={`${member_string}: ${member_count}`} />
                </div>
                <div className={styles.stat}>
                  <Markdown content={`${post_string}: ${post_count}`} />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </ErrorBoundary>
    )
  }
)

Kard.displayName = "Kard"

export default Kard
