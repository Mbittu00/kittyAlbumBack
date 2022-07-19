import express from'express'
import img from'../model/img.js'
import user from'../model/user.js'
import jwt from'jsonwebtoken'
const app=express.Router()

//create img
app.post('/post',async(req,res)=>{
  let token=jwt.verify(req.body.token,'bsdk')
  try {
  let userV=await user.findOne({_id:token._id})
  let ress=await img.create({userId:userV._id,username:userV.username,imgUri:req.body.uri})
  res.status(200).send(ress)
  } catch (e) {
    res.status(500).send({msg:e})
    console.log(e)
  }
})
//get all img

app.post('/get',async(req,res)=>{
try {
let token=jwt.verify(req.body.token,'bsdk')
let userV=await user.findOne({_id:token._id})
if (user) {
    try {
let ress=await img.find({})
res.status(200).send(ress)
  } catch (e) {
    res.status(500).send({msg:e})
    console.log(e)
  }
}else{
  res.status(404).send({msg:'user not found'})
}
} catch (e) {
  res.status(404).send({msg:'user not found'})
}
})
//get an user img
app.get('/user/:userId',async(req,res)=>{
  try {
let res=await img.find({userId:req.params.userId})
res.status(200).send(res)
  } catch (e) {
    res.status(500).send({msg:e})
  }
})
//get an img
app.get('/find/:id',async(req,res)=>{
  try {
  let ress=await img.findOne({_id:req.params.id})
  res.status(200).send(ress)
  } catch (e) {
    res.status(500).send({msg:e})
    console.log(e)
  }
})

export default app