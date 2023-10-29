var express = require('express')
var router = express.Router()
const usersModel = require('./users')


/* GET home page. */
router.get('/', function (req, res) {  
  res.render('loginPage');
});

router.post('/signupPageForm', async (req, res) => {
  let name = req.body.userName;
  let email = req.body.userEmail;
  let password = req.body.userPassword;

  let userData = await usersModel.create({
    name: name,
    email: email,
    password: password
  })

  res.render("signedInPage", { userName: name, })
});

router.post('/loginPageForm', async (req, res) => {
  let email = req.body.userEmail;
  let password = req.body.userPassword;

  let findOneUser = await usersModel.findOne({ email: email, password:password });
  console.log(findOneUser);
  if(findOneUser === null){
    res.render("myError", {errorMessage: "User not found"});
  }
  else{
    res.render("loggedInPage", {name: findOneUser.name });
  }
});

router.get('/find', async (req, res) => {
  let allUserData = await usersModel.find()
  if(allUserData === null){
    res.render("myError", {errorMessage: "Empty"});
  }
  else{
    res.render("foundAllUserPage", {allUserData: allUserData} );
  }
});

router.get('/findOneAndDelete', async (req, res) => {
  res.render("deleteAccount");
});

router.post('/deleteAccountFormData', async (req, res) => {
  let name = req.body.userName;
  let deletedUser = await usersModel.findOneAndDelete({ name: name });
  if(deletedUser === null){
    res.render("myError", {errorMessage: `${name}'s account not found!`})
  }
  else{
    res.render("myError", {errorMessage: `${name}'s account is deleted`})
  }
});

router.get('/home', async (req, res) => {
  res.render("homePage");
});

router.post('/homePageForm', async (req, res) => {
  let choice = req.body.selection;

  if(choice === '/'){
    res.redirect('/');
  }
  else if(choice === '/find'){
    res.redirect('/find');
  }
  else if(choice === '/findOneAndDelete'){
    res.redirect('/findOneAndDelete');
  }
  else{
    res.redirect('/home');
  }

});


router.post('/selectionForm', (req, res) => {
  res.redirect("/home");
})
router.post('/homeForm', (req, res) => {
  res.redirect("/");
})

module.exports = router
