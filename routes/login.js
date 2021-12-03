const { application } = require('express');
const express = require('express');
const router  = express.Router();
const { login } = require('./helperFunctions.js');



const loginPage = (db) => {
  router.get("/", (req, res) => {
    const id = req.session.user_id

    if (id) {
      return res.redirect('/lists');
    }

    const templateVars = {
      user_id: null,
      email: null,
      username: null,
      profile_pic: null
    }

    return res.render('login', templateVars);

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
          res.redirect("lists");
          // res.send({username: user.username, email: user.email, id: user.id});
        })
        .catch(err => res.send(err));
});

return router;

};


module.exports = loginPage;
