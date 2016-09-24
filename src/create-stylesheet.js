import isNode from './is-node'

module.exports = (classes)=> {
  if (isNode) return

  const style = document.createElement('style')

  style.textContent = classes
  document.head.appendChild(style)
}
