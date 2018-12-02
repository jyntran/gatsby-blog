import React from 'react'
import Helmet from 'react-helmet'
import Media from 'react-media'
import { StaticQuery, graphql } from 'gatsby'

export default ({ children, location }) => (
   <StaticQuery
     query={graphql`
       query LayoutQuery {
         site {
           siteMetadata {
             title
             titleAbbrev
           }
         }
       }
     `}
     render={data => (
       <>
         <Helmet titleTemplate={`%s | ${data.site.siteMetadata.title}`} defaultTitle={data.site.siteMetadata.title} />
         <div className="container">
            <div className="topBar">
            <div className="header"><h1>
              <Media query={{ maxWidth: 719 }}>
                {matches =>
                  matches ? (
                    <a href="/" className="headerLinkAbbrev">
                    {data.site.siteMetadata.titleAbbrev}</a>
                  ) : (
                    <a href="/" className="headerLink">
                    {data.site.siteMetadata.title}</a>
                  )
                }
              </Media>
            </h1></div>
            <div className="nav">
              <a href="/about">
              About
              </a>
              <a href="https://jyntran.ca" target="_blank" rel="noopener noreferrer">
              Portfolio
              </a>
            </div>
            </div>
           <div className="main">
             {children}
           </div>
         </div>
       </>
     )}
   />
)
