const headTagRE = /<h[1-6][^>]*>([^<]*)<\/h[1-6]>/g
const tagRE = /<[^>]+>/g

const linkHash = (str = '')=> {
  return str.replace(headTagRE, (m, text, pos)=>{
    const [startTag, endTag] = m.match(tagRE)
    const hashHref = text.replace(/\s/g, '-').toLocaleLowerCase()

    return `${startTag}<a href="#${hashHref}">${text}</a>${endTag}`
  })
}

module.exports = linkHash
