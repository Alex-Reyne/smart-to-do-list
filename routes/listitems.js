const { application } = require('express');
const express = require('express');
const router  = express.Router();


const userItems = (db) => {
  router.get("/", (req, res) => {
    const id = req.session.user_id
    db.query(`SELECT items.name, users.*
    FROM items
    JOIN lists ON lists.id = list_id
    JOIN users ON users.id = user_id
    WHERE lists.name LIKE '%buy%'
    AND users.id = 1;`)
      .then(result => {
        const items = result.rows[0];

        console.log(items)

        const templateVars = {
          user_id: items.id,
          email: items.email,
          username: items.username,
          profile_pic: items.profile_pic,
          name: items.name
        }

        console.log(templateVars)
        res.render('items', templateVars)
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

module.exports = userItems;
