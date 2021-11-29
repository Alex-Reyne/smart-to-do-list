const { application } = require('express');
const express = require('express');
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

    console.log(templateVars)
    return res.render('signup', templateVars);

  });

return router;

}



module.exports = signUpPage;
