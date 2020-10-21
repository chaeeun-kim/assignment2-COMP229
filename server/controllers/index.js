let express=require('express');
let router =express.Router();
let mongoose=require('mongoose');
let passport=require('passport');
//create the user model instance
let userModel=require('../models/user');
let User=userModel.User;

module.exports.displayHomePage=(req,res,next)=>{
res.render('index',{title :'Home'});

}

module.exports.displayProjectsPage=(req,res,next)=>{
    res.render('projects',{title :'Projects'});
    
}

 module.exports.displayServicePage=(req,res,next)=>{
    res.render('service',{title :'Service'});
 }

 module.exports.displayAboutmePage=(req,res,next)=>{
     res.render('aboutme',{title :'About me'});
 }   
 module.exports.displayContactmePage=(req,res,next)=>{
    res.render('contactme',{title :'Contact me'});
 } 

 module.exports.displayLoginPage=(req,res,next)=>{
if(!req.user)
{
res.render('auth/login',
{ title:"Login",
messages : req.flash('loginMessage'),
displayName: req.user ? req.user.displayName:''

})


}
else
{return res.redirect('/');
}

}

module.exports.processLoginPage=(req,res,next)=>{
passport.authenticate('local', (err,user,info)=>{
if(err)
{
return next(err);
}
//is there a user login error?
if(!user)
{
req.flash('loginMessage','Authentication Error');
return res.redirect('/login');
}

req.login(user,(err) =>{
//server error?
if(err)
{
return next(err);
}

return res.redirect('/contacts-list');
});
})(req,res,next);

}

module.exports.displayRegisterPage=(req,res,next)=> {

if(!req.user)
res.render('auth/register',
{ title: "Register",
messages: req.flash('registerMessage'),
displayName: req.user ? req.user.displayName : ' '

});
else
{return res.redirect('/');

}

}

module.exports.processRegisterPage= (req,res,next) =>
{
 let newUser= new User({
username: req.body.username,
//password: req.body.password
email: req.body.email,
displayName: req.body.displayName

    });

User.register(newUser, req.body.password, (err)=> {
if(err)
{
console.log("Error: Inserting New user");
if(err.name =="UserExistsError")
{
req.flash('registerMessage',
'Registration Error: User Already Exists!'
);
}
return res.render('auth/register',{
title: 'Register',
messages: req.flash('registerMessage'),
displayName: req.user ? req.user.displayName : ' '


});

}
else
{
//if no error exists, then registration is successsful


//redirect the user and authenticate them
return passport.authenticate('local')(req,res,()=>{
res.redirect('/contacts-list')

});
}

});

}