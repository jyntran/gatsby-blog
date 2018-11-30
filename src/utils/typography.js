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
    margin: '.5em auto 1em auto',
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
    width: '60%',
    float: 'left'
  },
  '.header a': {
    backgroundColor: '#f66',
    color: '#333',
    padding: '.2em'
  },
  '.nav': {
    width: '40%',
    float: 'left',
    fontSize: '1.25em',
    height: '2.1em',
    marginBottom: '2em',
    padding: '.25em .1em',
    textAlign: 'right',
    textTransform: 'uppercase'
  },
  '.nav a:hover': {
    textDecoration: 'none',
    borderBottom: 'thin solid #f66'
  },
  '.postEntry': {
    fontSize: '1.1em'
  },
  '.postEntry a': {
    fontWeight: 'bold'
  }
})

const typography = new Typography(moragaTheme)

module.exports = typography
