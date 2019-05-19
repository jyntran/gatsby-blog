import React from "react"
import { Link } from "gatsby"

const PostLink = ({ post }) => (
  <div className="postEntry">
    <Link to={post.fields.slug}>
      <h2>{post.frontmatter.title}</h2>
    </Link>
    <p className="date">{post.frontmatter.date}</p>
    <p>{post.excerpt}</p>
  </div>
)

export default PostLink
