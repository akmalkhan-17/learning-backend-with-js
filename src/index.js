import express from "express"

const app = express()

app.get('/home', (req,res)=> {
	res.send("this is the home page")
})

app.get('/', (req,res)=>{
	res.send("<h1> this si the heading h1 </h1>")
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})