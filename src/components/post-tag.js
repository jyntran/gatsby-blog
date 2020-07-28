import React from "react"
import { Link } from "gatsby"

const PostTag = ({ tag }) => {
  const url = "tags/" + tag
    return (<li>
      <Link to={url}>
        {tag}
      </Link>
    </li>)
  }

export default PostTag
