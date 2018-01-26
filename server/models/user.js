/**
 * Created by peter on 2017/11/20.
 */
var mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs')

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: {
            validator: function(v) {
                return validator.isEmail(v);
                //return /\w+(\.\w+)*@\w+(\.\w+)+$/.test(v);
            },
            message: '{VALUE} is not a email!'
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
}, {
  usePushEach: true
});

//overwrite
UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject,['_id','email']);
}

UserSchema.statics.generateAuthToken = function(user){
    var User = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, process.env.JWT_SECRET).toString();
    user.tokens.push({access, token});
    // return user.save().then(() => {
    //     return token;
    // })
    return User.update({
        _id: user._id
    },{
        "tokens":[{access, token}]
    }).exec().then(() => {
        return token;
    })
}

UserSchema.statics.findByToken = function (token) {
    var user = this;
    var decoded;

    try{
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    }catch (e) {
        // return new Promise((resolve, reject) => {
        //     reject();
        // })
        return Promise.reject();
    }
    return user.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    })
};

UserSchema.statics.findByCredentials = function(email, password) {
    var User = this;
    return User.findOne({email}).then((user) => {
        if(!user) {
            return Promise.reject();
        }
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res)=> {
                if(res){
                    resolve(user);
                }else {
                    reject();
                }
            })
        })
    })
}

UserSchema.methods.removeToken = function (token) {
    var user = this;

    return user.update({
        $pull: {
            tokens: {token}
        }
    })
};

UserSchema.pre('save', function(next){
    var user = this;
    if(user.isModified('password')){
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash)=>{
                user.password = hash;
                next();
            })
        })
    }else{
        next();
    }
})

var User = mongoose.model('User',UserSchema);
module.exports = {User};