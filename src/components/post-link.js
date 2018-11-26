import React from "react"
import { Link } from "gatsby"

const PostLink = ({ post }) => (
  <div>
    <Link to={post.fields.slug}>
      {post.frontmatter.title} ({post.frontmatter.date})
    </Link>
    <p>{post.excerpt}</p>
  </div>
)

export default PostLink