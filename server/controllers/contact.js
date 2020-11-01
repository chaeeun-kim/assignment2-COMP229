let express= require('express');
let router=express.Router();
let mongoose=require('mongoose');

//create a reference to the model
let Contact= require('../models/contact');

module.exports.displayContactList = (req,res,next) =>{
    Contact.find((err,contactList) =>{
    if (err)
    {
        return console.error(err);
    }
    else{
       // console.log(BookList);
        res.render('contact/list',{title:'Busniess Contacts List', ContactList: contactList})
    //it will render book.ejs page and the title will be book-list, and BookList is the object pushing to view
    
        }
    });
    }
//it will display updatepage when user click the updat button in the contact list
module.exports.displayUpdatePage =(req,res,next)=>{
    let id=req.params.id;
Contact.findById(id,(err,contactToUpdate)=>
{if(err){
console.log(err);
res.end(err);

}
else{
res.render('contact/update',{title:'Update Contact', contact:contactToUpdate})
}
});
}
//it will update changes to dataabse

module.exports.processUpadatePage =(req,res,next)=>
{let id=req.params.id
let updateContact= Contact({
"_id":id,
"name":req.body.name,
"number":req.body.number,
"email":req.body.email
});


Contact.updateOne({_id:id},updateContact,(err)=>{
if(err)
{ console.log(err);
res.end(err);
}
else
{
res.redirect('/contacts-list');
}

});
}

//it will perform to delete the selected data from database

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Contact.deleteOne({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
             // refresh the book list
             res.redirect('/contacts-list');
        }
    });
}

    
