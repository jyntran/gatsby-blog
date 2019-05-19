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
    margin: 'auto auto 1em',
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
  '.topBar': {
    padding: '.4em 0',
    marginBottom: '.8em'
  },
  '.header': {
    display: 'inline-block',
    paddingTop: '.2em'
  },
  '.header a': {
    backgroundColor: '#f66',
    color: '#333',
    padding: '.25em'
  },
  '.nav': {
    display: 'inline-block',
    float: 'right',
    fontSize: '1.25em',
    height: '2.1em',
    padding: '.4em .1em',
    textAlign: 'right',
    textTransform: 'uppercase'
  },
  '.nav a': {
    marginLeft: '.8em'
  },
  '.nav a:hover': {
    textDecoration: 'none',
    borderBottom: 'thin solid #f66'
  },
  '.postEntry': {
    fontSize: '1.1em'
  },
  '.postEntry h2': {
    marginBottom: '0.525rem'
  },
  '.postEntry .date': {
    fontStyle: 'italic'
  }
})

const typography = new Typography(moragaTheme)

module.exports = typography
