const { application } = require('express');
const express = require('express');
const router  = express.Router();


const signUpPage = (db) => {
  router.get("/", (req, res) => {
    const id = req.session.user_id
    db.query(`SELECT * FROM users`)
    .then(data => {
        const users = data.rows[0];
        console.log(data.rows)

        const templateVars = {
          user_id: users.id,
          email: users.email,
          username: users.username,
          profile_pic: users.profile_pic
        }

        console.log(templateVars)
        res.render('signup', templateVars);
        return users;
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

return router;

}



module.exports = signUpPage;
