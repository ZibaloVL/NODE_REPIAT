const http = require('http')
const open = require('open')

const server = http.createServer(
  (req, res) => {
    res.write('hello from Node.js')
    res.end(`<div> slava </div>`)
  }
)
server.listen (
  3000, 
   async () => {
    console.log('serveer worck')
    await open('http://localhost:3000');
  }
)