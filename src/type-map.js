module.exports = (type)=> {
  return ({
    sh: 'bash',
    styl: 'stylus',
    ts: 'typescript',
    js: 'javascript',
    cs: 'coffeescript',
    coffee: 'coffeescript',
  })[type] || 'markup'
}
