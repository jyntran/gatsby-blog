const Typography = require('typography')
const moragaTheme = require('typography-theme-moraga')

moragaTheme.overrideThemeStyles = ({ rhythm }, options, styles) => ({
  'html': {
    backgroundColor: '#333',
    borderTop: 'thick solid #f66'
  },
  '.container': {
    color: '#eee',
    fontFamily: 'sans-serif',
    margin: '0 auto 1em auto',
    width: '80%',
    maxWidth: '1000px'
  },
  'a': {
    color: '#f66',
    textDecoration: 'none'
  },
  'a:hover': {
    textDecoration: 'underline'
  },
  'code, pre': {
    color: '#dbb',
    backgroundColor: '#222',
    overflowX: 'auto' 
  },
  'code': {
    padding: '.4em'
  },
  'pre': {
    padding: '.6em'
  },
  '.header': {
    float: 'left'
  },
  '.header a': {
    backgroundColor: '#f66',
    borderRadius: '0 0 .2em .2em',
    color: '#333',
    lineHeight: '1.5em',
    padding: '.2em .4em'
  },
  '.nav': {
    float: 'left',
    fontSize: '1.25em',
    fontWeight: 'bold',
    height: '2.1em',
    letterSpacing: '.05em',
    margin: '0 1em 2em 1em',
    padding: '.5em .1em',
    textAlign: 'right',
    textTransform: 'lowercase'
  },
  '.nav a:hover': {
    textDecoration: 'none',
    borderBottom: 'thin solid #f66'
  },
  '.main': {
    clear: 'both',
    paddingBottom: '1em'
  },
  '.postEntry': {
    borderBottom: '#966 solid .1em',
    fontSize: '1.1em',
    margin: '1em 0 1.5em'
  },
  '.postEntry a': {
    fontWeight: 'bold'
  },
  '.postHeader': {
    borderBottom: '#966 solid .1em',
    marginBottom: '1.25em'
  },
  '.postHeader h2': {
    fontSize: '1.2em'
  }
})

const typography = new Typography(moragaTheme)

module.exports = typography
