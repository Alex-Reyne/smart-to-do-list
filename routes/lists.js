const express = require('express');
const router  = express.Router();

// router.get('/', (req, res) => {
//   res.render("lists");
// });

// module.exports = router;
const userLists = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT *
    FROM users`)
      .then(result => {
        const items = result.rows[0];

        console.log(items)

        const templateVars = {
          user_id: items.id,
          email: items.email,
          username: items.username,
          profile_pic: items.profile_pic
        }

        console.log(templateVars)
        res.render('lists', templateVars)
        return items;
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};

module.exports = userLists;
