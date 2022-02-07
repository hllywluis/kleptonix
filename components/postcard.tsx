import Card from "react-bootstrap/Card"
import Parse from "html-react-parser"

export default function Postcard({
  title,
  author,
  username,
  klepton,
  text,
  views,
  replies,
}) {
  return (
    <Card className="h-100 bg-light border rounded-3">
      <Card.Body>
        <div className="text-center">
          <Card.Title>
            <h4>{title}</h4>
          </Card.Title>
          <Card.Subtitle>
            <h6 className="text-muted">
              {author} - @{username} - k/{klepton}
            </h6>
          </Card.Subtitle>
        </div>
        <hr />
        <Card.Text>{Parse(text)}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-left">
        <div className="row">
          <div className="col-auto mr-auto">
            <small className="text-muted">
              {views} {views === 1 ? " view" : " views"}
            </small>
          </div>
          <div className="col-auto mx-auto text-center">
            <small className="text-muted">
              {replies} {replies === "1" ? " Reply" : " Replies"}
            </small>
          </div>
          <div className="col-auto ml-auto text-right">
            <small className="text-muted">Report</small>
          </div>
        </div>
      </Card.Footer>
    </Card>
  )
}
