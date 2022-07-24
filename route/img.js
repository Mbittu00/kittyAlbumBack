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
  let ress=await img.create({userId:userV._id,username:userV.username,imgUri:req.body.uri,pathName:req.body.pathName})
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
let ress=await img.find({}).sort({createdAt: -1})
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
let rez=await img.find({userId:req.params.userId}).sort({createdAt: -1})
res.status(200).send(rez)
  } catch (e) {
    res.status(500).send({msg:e})
    console.log(e)
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
//delete an img
app.delete('/delete/:id',async(req,res)=>{
  //console.log(req.body.id)
  try {
 let rez=await img.findByIdAndDelete(req.params.id)
 let us=await user.find({})
 
let pop= await Promise.all(
   us.map(async(e)=>{
return await user.findOneAndUpdate({_id:e._id},{
  $pull:{fav:req.params.id}
},{new:true})
   })
   )
 res.status(200).send({msg:'deleted'})
 console.log(pop)
  } catch (e) {
    res.status(500).send({msg:'somethin is wrong'})
  }
})
export default app