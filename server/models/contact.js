let mongoose =require('mongoose');

//creat a MODEL class
let contactModel= mongoose.Schema({
name: String,
number:String,
email:String
},
{
collection :"contact"

});
module.exports=mongoose.model('Contact',contactModel);
