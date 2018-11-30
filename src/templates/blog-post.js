import React from 'react'
import Layout from "../components/layout"
import { graphql } from 'gatsby' 

export default ({ data }) => {
	const post = data.markdownRemark
	return (
		<Layout>
			<h1>
				{post.frontmatter.title}
			</h1>
			<h3>
				{post.frontmatter.date}
			</h3>

			<div dangerouslySetInnerHTML={{ __html: post.html }} />
		</Layout>
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
