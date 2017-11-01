import React from 'react'
import g from 'glamorous'
import { css } from 'glamor'
import Link from 'gatsby-link'

import { rhythm } from '../utils/typography'

const linkStyle = css({ float: 'right'})

export default ({ children, data }) =>
  <g.Div
    margin={'0 auto'}
    maxWidth={700}
    padding={rhythm(2)}
    paddingTop={rhythm(1.5)}
  >
    <Link to={'/'}>
      <g.H1
        marginBottom={rhythm(2)}
        display={'inline-block'}
        fontSize={'x-large'}
      >
        {data.site.siteMetadata.title}
      </g.H1>
    </Link>
    <a href="http://jyntran.ca" className={linkStyle} target="_blank">
      Portfolio
    </a>
    {children()}
  </g.Div>

export const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`