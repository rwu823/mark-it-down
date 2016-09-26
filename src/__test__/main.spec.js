import Markdown from '../'

it('convert to html with no `hasHeadHash`', ()=> {
  const md = new Markdown({
    hasHeadHash: false
  })
  const markdown = `# Install`

  expect(md.toHTML(markdown)).toMatch(`<h1>Install</h1>`)
})

it('convert to html with `hasHeadHash`', ()=> {
  const md = new Markdown({
    hasHeadHash: true
  })
  const markdown = `# Install`

  expect(md.toHTML(markdown)).toMatch(`<h1 id="install"><a href="#install">Install</a></h1>`)
})

it('convert to html with `code snippet`', ()=> {
  const md = new Markdown({})
  const code = `\`\`\`js
let x,
    y
\`\`\``

  expect(md.toHTML(code)).toMatch(`<code class="js language-js">`)
})
