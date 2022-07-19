import express from'express'
import cors from'cors'
import mongodb from'./db.js'
import auth from'./route/user.js'
import img from'./route/img.js'
//app config
const app=express()
mongodb()
let port=process.env.PORT || 8080 
//middleware
app.use(express.json())
app.use(cors())
//routes 
app.get('/',(req,res)=>{
  res.send('hello world')
})
app.use('/auth',auth)
app.use('/img',img)
//listen
app.listen(port,()=>{
  console.log(port)
})