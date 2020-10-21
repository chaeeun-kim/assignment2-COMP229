var express = require('express');
var router = express.Router();

let indexcontroller=require('../controllers/index');

/* GET home page.*/

router.get('/',indexcontroller.displayHomePage);

/* GET projects page*/
router.get('/projects',indexcontroller.displayProjectsPage);


/* GET services page*/
router.get('/service',indexcontroller.displayServicePage);


/* GET about me page*/
router.get('/aboutme',indexcontroller.displayAboutmePage);


/* GET contact me page*/
router.get('/contactme',indexcontroller.displayContactmePage);

/*GET Route for displaying the Login page-Create operation  */
router.get('/login',  indexcontroller.displayLoginPage);
/*Post Route for processing the Login page */
router.post('/login',indexcontroller.processLoginPage);

/*GET Route for displaying the register page */
router.get('/register',indexcontroller.displayRegisterPage);

/*Post Route for processing the register page */
router.post('/register',indexcontroller.processRegisterPage);


module.exports = router;
