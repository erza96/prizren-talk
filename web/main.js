var app = require('choo')()
var html = require('choo/html')
var wsock = require('websocket-stream')
var stream = wsock('ws://192.168.0.113:4000')
var to = require('to2')
var split = require('split2')

app.use(function (state, emitter) {
  state.messages = []
  state.msg = ''
  emitter.on('send', function (msg) {
    stream.write(msg + '\n')
    state.msg = ''
  })
  stream.pipe(split()).pipe(to(function (buf, enc, next) {
    state.messages.unshift(buf.toString())
    emitter.emit('render')
    next()
  }))
})

app.route('/', function (state, emit) {
  return html`<body>
    <h1>hi</h1>
    <form onsubmit=${onsubmit}>
      <input onkeydown=${onchange} onchange=${onchange}
        type="text" name="msg" value=${state.msg} />
      <button type="submit">chat</button>
    </form>
    ${state.messages.map(function (msg) {
      return html`<pre>${msg}</pre>`
    })}
  </body>`
  function onchange (ev) {
    state.msg = ev.target.value
  }
  function onsubmit (ev) {
    ev.preventDefault()
    emit('send', ev.target.msg.value)
  }
})
app.mount('body')
