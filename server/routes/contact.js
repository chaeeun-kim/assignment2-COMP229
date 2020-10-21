let express =require('express');
let router=express.Router();
let mongoose=require('mongoose');

let passport=require('passport');

/*connect to our book model
let Contact =require('../models/contact');*/
let contactController=require('../controllers/contact');
//helper fuction for guard purposers
function requireAuth(req,res,next)
{

//check if the user is logged in
if(!req.isAuthenticated())
{

return res.redirect('/login');

}
next();
}

/*get route for the book list page--READ operation*/
router.get('/',contactController.displayContactList);

/*displaying update page*/
router.get('/update/:id', requireAuth,contactController.displayUpdatePage);


/*processing of update */
router.post('/update/:id', requireAuth,contactController.processUpadatePage);


/*get to perform deletion-delete operaion*/
router.get('/delete/:id', requireAuth,contactController.performDelete);


module.exports=router;
