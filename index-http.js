const http=require('http')
let data=[{notes : [
  {
    id: 1,
    content: "HTML is easy",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }]
	},
]
const app=http.createServer((req,res)=>{
	res.writeHead(200,{'Content-Type':'application/json'})
	res.end(JSON.stringify(data))
})

const port=3001;
app.listen(port)
console.log("Server is running at port",port)
