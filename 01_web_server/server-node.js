
const http = require('http')
const host = '127.0.0.1'
const port = 3000

const server = http.createServer((req,res)=>{
    if(req.url=='/') {
        res.statusCode = 200
        res.setHeader('Content-Type','text/plain')
        res.end("hai")
    } else if(req.url=='/test') {
        res.statusCode = 200
        res.setHeader('Content-Type','text/plain')
        res.end("test server")
    } else {
        res.statusCode = 404
        res.setHeader('Content-Type','text/plain')
        res.end("error")
    }
    });

    server.listen(port,host, ()=> {
        console.log(` server is listening http://${host}:${port}`)
    })