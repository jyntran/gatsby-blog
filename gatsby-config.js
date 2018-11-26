module.exports = {
  siteMetadata: {
    title: 'blog@jyntran',
  },
  plugins: [
  	{
		resolve: 'gatsby-source-filesystem',
  		options: {
  			name: 'src',
	    		path: `${__dirname}/src/`
  		}
  	},
  	{
  		resolve: 'gatsby-plugin-typography',
  		options: {
  			pathToConfigModule: 'src/utils/typography'
  		}
  	},
	{
		resolve: 'gatsby-transformer-remark',
		options: {
			plugins: [
				{
					resolve: 'gatsby-remark-images',
					options: {
						maxWidth: 1000,
						linkImagesToOriginal: true
					}
				}
			]
		}
	},
  	'gatsby-plugin-glamor'
 ]
}
