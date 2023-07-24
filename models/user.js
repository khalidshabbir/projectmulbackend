const mongoose=require('mongoose');
const bcrypt = require('bcrypt');
const userSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true,
            min:3,
            max:45
        },
       
       
        email:{
            type:String,
            required:true,
            trim:true,
            unique:true,
            lowercase:true
        },
        phone:{
            type:String,   
            required:true,
            trim:true,
             
            
        },
        
        
        hash_password:{
            type:String,
            required:true
        },
        role:{
            type:String,
            enum:['user','admin'],
            default:'user'
        },
        verified:{
            type:Boolean,default:false
        },
        verificationCode:{
            type:String
        },
        verificationCodeExpires: Date,
        contactNumber:{type:String},
        profilePicture:{type:String},


    },{timestamps:true});

    userSchema.virtual('password')
    .set(function(password) {
      this._password = password;
      this.hash_password = bcrypt.hashSync(password, 10);
    })

    userSchema.virtual('fullName')
    .get(function(){
        return  `${this.firstName} ${this.lastName}`
    })

   userSchema.methods = {
    authenticate: function(password){
        return bcrypt.compareSync(password,this.hash_password)
    }
   }



    module.exports=mongoose.model("User",userSchema)