const mongoose=require('mongoose');

const User=mongoose.model('User' ,{
    name:{
        type:String
    },
    age:{
        type:Number
    },
    lastname:{
        type:String
    }
}
    )
module.exports=User;