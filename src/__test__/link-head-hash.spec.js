import linkHead from '../link-head-hash'

it('basic hash replace with `h1`', ()=> {
  const html = '<h1>Head1</h1>'

  expect(linkHead(html)).toBe(`<h1 id="head1"><a href="#head1">Head1</a></h1>`)
})

it('multi head attrs', ()=> {
  const html = '<h1 data-id="h1" class="a">Head1</h1>'

  expect(linkHead(html)).toBe(`<h1 data-id="h1" class="a" id="head1"><a href="#head1">Head1</a></h1>`)
})

it('basic hash replace with `h1` and space text', ()=> {
  const html = '<h1>Head 1</h1>'

  expect(linkHead(html)).toBe(`<h1 id="head-1"><a href="#head-1">Head 1</a></h1>`)
})

it('basic hash replace with `h1` and two space', ()=> {
  const html = '<h1>Advance Usage</h1>'

  expect(linkHead(html)).toBe(`<h1 id="advance-usage"><a href="#advance-usage">Advance Usage</a></h1>`)
})

it('basic hash replace with `h1` and `code` tag', ()=> {
  const html = '<h1>Head 1</h1> <code>let x</code>'

  expect(linkHead(html)).toBe(`<h1 id="head-1"><a href="#head-1">Head 1</a></h1> <code>let x</code>`)
})

it('Test multi line', ()=> {
  const html = `
<h1>Head 1</h1> 
<h2>Head2</h2>
<code>let x</code>
`

  const expectHTML = `
<h1 id="head-1"><a href="#head-1">Head 1</a></h1> 
<h2 id="head2"><a href="#head2">Head2</a></h2>
<code>let x</code>
`

  expect(linkHead(html)).toBe(expectHTML)
})
