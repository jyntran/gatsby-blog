import React from 'react'
import g from 'glamorous'
import Link from 'gatsby-link'
import { graphql } from 'gatsby' 

import { rhythm } from '../utils/typography'

export default ({ data }) => {
	return (
		<div>
			<h4>
				{data.allMarkdownRemark.totalCount} Posts
			</h4>
			{data.allMarkdownRemark.edges.map(({ node }) =>
				<div key={node.id}>
					<Link
						to={node.fields.slug}
						css={{ textDecoration: 'none', color: 'inherit' }}
					>
						<g.H3 marginBottom={rhythm(1/4)}>
							{node.frontmatter.title}{' '}
							<g.Span color="#767676">- {node.frontmatter.date}</g.Span>
						</g.H3>
					</Link>
					<p>
						{node.excerpt}
					</p>
				</div>
			)}
		</div>
	)
}

export const query = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}){
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MM/DD/YYYY")
          }
          fields {
          	slug
          }
          excerpt
        }
      }
    }
  }
 `
