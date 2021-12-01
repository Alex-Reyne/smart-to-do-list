const { application, response, query } = require('express');
const express = require('express');
const router  = express.Router();


const userProfile = (db) => {
  router.get("/", (req, res) => {
    const id = req.session.user_id

    if (!id) {
      return res.redirect('/login');
    }

    db.query(`SELECT * FROM users WHERE id = ${id};`)
      .then(data => {
        const users = data.rows[0];
        console.log(data.rows)

        const templateVars = {
          user_id: users.id,
          email: users.email,
          username: users.username,
          password: users.password,
          profile_pic: users.profile_pic
        }

        console.log(templateVars)
        res.render('profile.ejs', templateVars);
        return users;
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post('/:userid', (req, res) => {
    console.log('params: ', req.params, 'body: ', req.body);
    const queryParams = [];
    queryParams.push(req.body.username)
    queryParams.push(req.body.email)
    queryParams.push(req.body.password)

    db.query(`
      UPDATE users
      SET username = $1, email = $2, password = $3
      WHERE id = 1;
    `, queryParams)
      .then((data) => {
        res.redirect('/profile')
      })
      .catch((err) => {
        console.log('ERROR:', err);
        res.status(500).send();
      } )
  })
  return router;
};

module.exports = userProfile;
