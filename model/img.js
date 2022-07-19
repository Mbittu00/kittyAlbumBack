import mongoose from'mongoose'

const img=mongoose.Schema({
  userId:{
    type:String,
    required:true
  },imgUri:{
    type:String,
    required:true
  },username:{
    type:String,
    required:true
  }
})

export default mongoose.model('img',img)