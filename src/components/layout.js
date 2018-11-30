import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

export default ({ children, location }) => (
   <StaticQuery
     query={graphql`
       query LayoutQuery {
         site {
           siteMetadata {
             title
           }
         }
       }
     `}
     render={data => (
       <>
         <Helmet titleTemplate={`%s | ${data.site.siteMetadata.title}`} defaultTitle={data.site.siteMetadata.title} />
         <div className="container">
            <div className="header"><h1><a href="/">
              {data.site.siteMetadata.title}</a></h1>
            </div>
            <div className="nav">
            <a href="https://jyntran.ca" target="_blank" rel="noopener noreferrer">
            Portfolio
            </a>
            </div>
           <div>
             {children}
           </div>
         </div>
       </>
     )}
   />
)
