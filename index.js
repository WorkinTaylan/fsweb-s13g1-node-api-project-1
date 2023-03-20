const server = require('./api/server');

const port = 9000;
/*const http=require("http");
const hostname= "192.168.1.7";



const server= http.createServer((req, res)=>{
    res.statusCode=200;
    res.setHeader=("Content-Type", "text/plain")
    res.end("Hello Dude")
})
*/
server.listen(port, ()=>{
    console.log(`Server running on ${port}`);
})
// START YOUR SERVER HERE
