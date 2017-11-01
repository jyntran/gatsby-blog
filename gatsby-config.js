module.exports = {
  siteMetadata: {
    title: 'blog@jyntran',
  },
  plugins: [
  	'gatsby-plugin-glamor',
  	{
  		resolve: 'gatsby-plugin-typography',
  		options: {
  			pathToConfigModule: 'src/utils/typography'
  		}
  	}
  ]
}
