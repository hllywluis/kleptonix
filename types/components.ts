import { Session } from "next-auth"

export interface User {
  id: number
  dname?: string | null
  hidename?: boolean | null
  subs: string[]
  email: string
  password: string
  name?: string | null
}

export interface NavbarProps {
  user: User | null
  className?: string
}

export interface NavLinkProps {
  href: string
  children: React.ReactNode
  onClick?: () => void
}

export interface PostCardProps {
  title: string
  author: string
  username: string
  klepton: string
  text: string
  views: number
  replies: number
  className?: string
}

export interface MarkdownProps {
  content: string
  className?: string
}

export interface KardProps {
  name: string
  description: string
  member_string: string
  member_count: number
  post_string: string
  post_count: number
  img_url: string
  className?: string
}
