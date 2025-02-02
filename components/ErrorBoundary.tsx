import React from "react"
import type { ErrorBoundaryProps } from "../types/components"

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("ErrorBoundary caught an error:", error, errorInfo)
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="alert alert-danger" role="alert">
            <h4 className="alert-heading">Something went wrong</h4>
            <p>
              Please try refreshing the page. If the problem persists, contact
              support.
            </p>
            <hr />
            <p className="mb-0">Error: {this.state.error?.message}</p>
          </div>
        )
      )
    }

    return this.props.children
  }
}
