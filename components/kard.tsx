import Link from "next/link"

import Container from "react-bootstrap/Container"
import Parse from "html-react-parser"

import { linkStyle } from "styles/linkStyle"

export default function Kard({
  name,
  description,
  member_string,
  member_count,
  post_string,
  post_count,
  img_url,
}) {
  const showdown = require("showdown")
  const converter = new showdown.Converter({
    strikethrough: true,
    omitExtraWLInCodeBlocks: true,
  })
  return (
    <>
      <Container className="py-2">
        <div
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)), url(${img_url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="h-100 p-5 bg-light border rounded-3"
        >
          <Container className="py-2" fluid>
            <div className="row text-white">
              <div className="col">
                <p>k/</p>
                <h1 style={linkStyle} className="display-6 pb-2 fw-bold">
                  <a
                    style={{ color: "white" }}
                    href={`/k/${name.toLowerCase()}`}
                  >
                    {name}
                  </a>
                </h1>
                <h6 className="col-md-8 py-2 fs-4">
                  {Parse(converter.makeHtml(description))}
                </h6>
                <div className="row">
                  <div className="col">
                    <h5>
                      {Parse(
                        converter.makeHtml(`${member_string}: ${member_count}`)
                      )}
                    </h5>
                  </div>
                  <div className="col">
                    <h5>
                      {Parse(
                        converter.makeHtml(`${post_string}: ${post_count}`)
                      )}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </Container>
    </>
  )
}
