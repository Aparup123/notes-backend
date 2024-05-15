require("dotenv").config()
const express=require("express")
const app=express()
const cors=require("cors")
app.use(cors())
app.use(express.static('dist'))
let notes =[
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
app.get("/", (req, res)=>{
	res.send('<h1>Hello World</h1>')
})

app.get("/api/notes", (req, res)=>{
	res.json(notes)
})

app.get("/api/notes/:id",function(req, res){
	const requestId=req.params.id
	const note=notes.find((n)=>{
		return n.id==requestId
	})
	if(note){
		res.json(note)
	}else{
		res.status(404).end()
	}
})

app.delete("/api/notes/:id", function(req, res){
	const deleteId=req.params.id
	notes=notes.filter(function(n){
		return n.id!=deleteId	
	})
	res.status(204).end()
	console.log(deleteId)
})

app.use(express.json())

app.post("/api/notes", (req, res)=>{
	console.log(req.body)
	function generateId(){
		if(notes.length==0)return 1;
		const noteIds=notes.map((note)=>note.id)
		console.log(...noteIds)
		return Math.max(...noteIds)+1
	}
	if(!req.body.content){
		res.status(400).json({
			"error":"No content"
		})
	}else{
		const newNote={
			id:generateId(),
			content:req.body.content,
			important:Boolean(req.body.important)||false
		}
		notes=notes.concat(newNote)
		res.json(newNote)
	}
})


const port=process.env.PORT||3001
app.listen(port, ()=>{
	console.log("Server is listening on port",port)
})
