const express=require("express")
const app=express()
const bodyParser=require("body-parser")
const port=8080

const toyRouter = require('./Route/toyRouter')
const categotyRouter = require('./Route/categotyRouter')
const userRouter = require('./Route/userRouter')

const connectDB=require("./Models/connectDb")

app.use(bodyParser.json())
app.use('/toy', toyRouter)
app.use('/user', userRouter);
app.use('/category', categotyRouter);

connectDB()

app.listen(port, () => {
    console.log("server is runing!!")
})