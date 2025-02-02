import { memo, useMemo } from "react"
import Parse from "html-react-parser"
import showdown from "showdown"
import type { MarkdownProps } from "../types/components"

// Initialize converter once
const converter = new showdown.Converter({
  strikethrough: true,
  omitExtraWLInCodeBlocks: true,
  tables: true,
  tasklists: true,
  smartIndentationFix: true,
  simpleLineBreaks: true,
  openLinksInNewWindow: true,
  emoji: true,
})

const Markdown = memo(({ content, className }: MarkdownProps): JSX.Element => {
  const parsedContent = useMemo(() => {
    try {
      const html = converter.makeHtml(content)
      return Parse(html)
    } catch (error) {
      console.error("Error parsing markdown:", error)
      return <div className="text-danger">Error rendering content</div>
    }
  }, [content])

  return <div className={className}>{parsedContent}</div>
})

Markdown.displayName = "Markdown"

export default Markdown
