const Typography = require('typography')
const moragaTheme = require('typography-theme-moraga')

moragaTheme.overrideThemeStyles = ({ rhythm }, options, styles) => ({
  'a, a:hover': {
    color: '#cc0000'
  },
  'code, pre': {
    color: '#666666',
    backgroundColor: '#fafafa',
    overflowX: 'auto' 
  }
})

const typography = new Typography(moragaTheme)

module.exports = typography
