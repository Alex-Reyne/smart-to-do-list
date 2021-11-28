const { application } = require('express');
const express = require('express');
const router  = express.Router();


const userProfile = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users WHERE username = 'Alice';`)
      .then(data => {
        const users = data.rows[0];
        res.render('profile.ejs', users)
        // console.log(users)
        return users
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};

module.exports = userProfile;
