import React from 'react'
import { graphql } from 'gatsby' 

export default ({ data }) => {
	const post = data.markdownRemark
	return (
		<div className="container">
			<h1>
				{post.frontmatter.title}
			</h1>
			<h3>
				{post.frontmatter.date}
			</h3>

			<div dangerouslySetInnerHTML={{ __html: post.html }} />
		</div>
	)
}

export const query = graphql`
	query BlogPostQuery($slug: String!) {
		markdownRemark(fields: {slug: {eq: $slug } }) {
			html
			frontmatter {
				title,
            	date(formatString: "MM/DD/YYYY")
			}
		}
	}
`
