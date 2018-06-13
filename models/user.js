const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs')

let emailLengthChecker = (email)=>{
    if(!email){
        return false;
    }else{
        if(email.length < 5 || email.length >30){
            return false;
        }else{
            return true
        }
    }
}

const emailValidators=[{
    validator:emailLengthChecker,
    message:'Email must be at least 5 characters but not more than 30'
}]


//user validator

let userNameLengthChecker = (username) =>{
    if(!username) return false;
    if (username.length < 3 || username.length > 15) {
        return false;
    }else{
        return true;
    }
}


let validUserName = (username) =>{
    if(!username) {
        return false;
    }else{
        const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
        return regExp.test(username)
    }

}

const userNameValidators = [
    {
        validator : userNameLengthChecker,
        message: 'user must be at least 3 characters but not more than 15'
    },{
        validator: validUserName,
        message: 'Username must not have any special character'
    }
]

//password validator

let passwordLengthChecker = (password) =>{
    if(!password) return false;
    if (password.length < 8 || password.length > 35) {
        return false;
    }else{
        return true;
    }
}

let validPassword = (password) =>{
    if(!password) {
        return false;
    }else{
    const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
        return regExp.test(password)
    }

}

const passwordValidators = [
    {
        validator : passwordLengthChecker,
        message: 'password must be at least 8 characters but not more than 35'
    },{
        validator : validPassword,
        message:'Must have at least one uppercase ,lowercase,special character, and number'
    }
]

var userSchema = new Schema({
    email:{type:String,trim:true,unique:true,required:true,lowercase:true , validate:emailValidators},
    username:{type:String,trim:true,unique:true,required:true,lowercase:true ,validate:userNameValidators},
    password:{type:String,required:true,validate:passwordValidators},
    CreatedAt:{type:Date,default:Date.now()},
    UpdatedAt:{type:Date}
})

userSchema.pre('save',function(next){
    if(!this.isModified('password'))
    return next();
    
    bcrypt.hash(this.password,null,null,(err,hash)=>{
        if(err) return next(err);
         this.password = hash;
        next()
    })
})

userSchema.methods.comparePassword = function(password){
   return bcrypt.compareSync(password,this.password)
}

module.exports = mongoose.model('User',userSchema);