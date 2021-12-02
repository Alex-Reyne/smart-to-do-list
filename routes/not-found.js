const { application, response, query } = require('express');
const express = require('express');
const router  = express.Router();

const notFound = function(db) {

  router.get("/", (req, res) => {
    const users = req.session.user_id;

    if (!users) {
      const templateVars = {
        user_id: null,
        email: null,
        username: null,
        profile_pic: null
      }
      return res.render('not-found', templateVars)
    }

    const templateVars = {
      user_id: users.id,
      email: users.email,
      username: users.username,
      profile_pic: users.profile_pic
    }

    return res.render('not-found', templateVars);
    });

  return router;
};


  module.exports = notFound;
