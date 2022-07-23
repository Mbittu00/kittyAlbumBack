import mongoose from'mongoose'

const user=mongoose.Schema({
  username:{
    type:String,
    required:true,
    unique:true
  },password:{
    type:String,
    required:true
  },fav:{
    type:Array,
    default:[]
  },imgUri:{
    type:String,
    default:''
  }
})

export default mongoose.model('user',user)