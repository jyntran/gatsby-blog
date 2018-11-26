import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import './layout.css'

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
            <h1><a href="/">
              {data.site.siteMetadata.title}</a></h1>
            <div style={{textAlign:'right'}}>
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