import React from "react"
import { Link } from "gatsby"
import PostTag from "../components/post-tag"


const PostLink = ({ post }) => {

  const postTags = post.frontmatter.tags != null ? post.frontmatter.tags.map((tag) =>  <PostTag key={tag} tag={tag}></PostTag>) : []

  return (
	  <div className="postEntry">
	    <Link to={post.fields.slug}>
	      {post.frontmatter.title} ({post.frontmatter.date})
	    </Link>
		{post.frontmatter.tags ? (<div>
			Tags: <ul class="postTags">{postTags}</ul>
		</div>) : ''}
	    <p>{post.excerpt}</p>
	  </div>
	)

}

export default PostLink
