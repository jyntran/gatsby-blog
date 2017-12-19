import Typography from 'typography'
import moragaTheme from 'typography-theme-moraga'

moragaTheme.overrideThemeStyles = ({ rhythm }, options, styles) => ({
  'a, a:hover': {
    color: '#cc0000'
  },
  'pre': {
    backgroundColor: '#f6f6f6',
    'overflow-x': 'auto'
  }
})

const typography = new Typography(moragaTheme)

module.exports = typography