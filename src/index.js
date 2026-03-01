import dotenv from "dotenv"
import connectDB from "./db/index.js"
import express from "express"

const app = express()

dotenv.config() // removed path as it was not required

connectDB()
.then(() => {
	app.listen(process.env.PORT || 8000, () => {
		console.log(`server is running at port : ${process.env.PORT}`)
	})
})

.catch((err)=> {
	console.log("MongoDB connection failed", err)
})


// import express from "express"
// const app = express()

// (async () => {
// 	try {
// 		await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
// 		app.on("error",(error) => {
// 			console.log("ERROR: ", error);
// 			throw error
// 		})

// 		app.listen(process.env.PORT, () => {
// 			console.log(`App is listening on ${process.env.PORT}`);
// 		})
// 	} catch (error){
// 		console.error("ERROR: ", error)
// 		throw err
// 	}
// })()
