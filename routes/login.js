const { application } = require('express');
const express = require('express');
const router  = express.Router();
const { login } = require('./helperFunctions.js');



const loginPage = (db) => {
  router.get('/', (req, res) => {
    res.render("login.ejs");
  });

// Login user with the information provided in the form
router.post('/', (req, res) => {
  const {email, password} = req.body;
  login(email, password, db)
  .then(user => {
    if (!user) {
      res.status(401);
      return res.send('just checking');
    }
    req.session.user_id = user.id;
    res.send({username: user.name, email: user.email, id: user.id});
  })
  .catch(err => res.send(err));
});

return router;

};


module.exports = loginPage;
