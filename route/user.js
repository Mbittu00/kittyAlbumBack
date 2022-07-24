import express from'express'
import user from'../model/user.js'
import img from'../model/img.js'
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
//get an user by id
app.get('/an/:id',async(req,res)=>{
  try {
  let rez=await user.findOne({_id:req.params.id}).select('-password')
  res.status(200).send(rez)
  } catch (e) {
    res.status(500).send({e})
    console.log(e)
  }
})
//like unlike an img
app.put('/like',async(req,res)=>{
  try {
    let rez=await user.findOne({_id:req.body._id})
    console.log(rez)
   if (rez.fav.includes(req.body.like)) {
   let unlike=await user.findOneAndUpdate({_id:rez._id},{
     $pull:{fav:req.body.like}
   },{new:true}).select('-password')
   res.status(200).send(unlike)
   }else{
  let like=await user.findOneAndUpdate({_id:rez.id},
  {
    $push:{fav:req.body.like}
  },{new:true}).select('-password')
  res.status(200).send(like)
   }
  } catch (e) {
    res.status(500).send({msg:e})
    console.log(e)
  }
})
//get all like photos
app.post('/get/like',async(req,res)=>{
  try {
    let rez=await user.findOne({_id:req.body._id})
    console.log(rez)
    let gepp=await Promise.all(
    rez.fav.map(async(e)=>{
  return await img.findOne({_id:e}) 
      })
      )
      res.status(200).send(gepp)
  } catch (e) {
    res.status(500).send({msg:e})
    console.log(e)
  }
})
//set user profile
app.post('/profile/img',async(req,res)=>{
  try {
  let rez=await user.findOneAndUpdate({_id:req.body._id},{
    imgUri:req.body.imgUri,
    imgPath:req.body.imgPath
  },{new:true}).select('-password')
 res.status(200).send(rez) 
  } catch (e) {
    res.status(500).send(e)
    console.log(e)
  }
})
export default app