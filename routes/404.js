const { application, response, query } = require('express');
const express = require('express');
const router  = express.Router();

router.get("/", (req, res) => {
  const id = req.session.user_id

  if (!id) {
    const templateVars = {
      user_id: null,
      email: null,
      username: null,
      profile_pic: null
    }

    console.log(templateVars)
    return res.render('404', templateVars)
  }

  const templateVars = {
    user_id: users.id,
    email: users.email,
    username: users.username,
    profile_pic: users.profile_pic
  }

  return res.render('/404', templateVars);

  });

  module.exports = router;
