const express = require('express');
const { addUser } = require('./helperFunctions');
const router  = express.Router();


const signUpPage = (db) => {
  router.get("/", (req, res) => {
    const id = req.session.user_id;

    if (id) {
      return res.redirect('/lists');
    }

    const templateVars = {
      user_id: null,
      email: null,
      username: null,
      profile_pic: null
    }

    return res.render('signup', templateVars);

  });


  // Register as a new user
  router.post('/', (req, res) => {
    const user = req.body;

    addUser(user, db)
    .then(user => {
      req.session.user_id = user.id;
      return res.redirect('lists');
    })
    .catch(err => res.send(err));
});

return router;

}



module.exports = signUpPage;
