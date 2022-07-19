import express from'express'
import user from'../model/user.js'
import jwt from'jsonwebtoken'
const app=express.Router()

//create user
app.post('/register',async(req,res)=>{
  try {
  let ress=await user.create(req.body)
  res.status(201).send(ress)
  } catch (e) {
    res.status(500).send({msg:e})
  }
})
//login user
app.post('/login',async(req,res)=>{
  try {
 let ress=await user.findOne({
  username:req.body.username,password:req.body.password})
  let token=jwt.sign({_id:ress._id},'bsdk')
  console.log(ress)
  let obj={username:ress.username,token,fav:ress.fav}
  res.status(200).send(obj)
  } catch (e) {
    res.status(500).send({msg:'plesh enter corect creadantial'})
    console.log(e)
  }
})
//delete an user
app.delete('/delete',async(req,res)=>{
  try {
let ress=await user.findOneAndDelete({username:req.body.username})
res.status(200).send({msg:'deleted user'})
  } catch (e) {
    res.status(500).send({msg:e})
    console.log(e)
  }
})
//get all user's
app.get('/users',async(req,res)=>{
  try {
let ress=await user.find({}).select('-password')
res.status(200).send(ress)
  } catch (e) {
    res.status(500).send({msg:e})
    console.log(e)
  }
})
//verify user
app.post('/verify',async(req,res)=>{
  try {
  let token=jwt.verify(req.body.token,'bsdk')
let ress=await user.findOne({_id:token._id}).select('-password')
res.status(200).send(ress)
  } catch (e) {
    res.status(500).send({msg:e})
    console.log(e)
  }
})
export default app