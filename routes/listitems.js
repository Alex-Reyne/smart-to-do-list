const { application } = require('express');
const express = require('express');
const router  = express.Router();


const userItems = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT items.name
    FROM items
    JOIN lists ON lists.id = list_id
    JOIN users ON users.id = user_id
    WHERE lists.name LIKE '%buy%'
    AND users.id = 1;`)
      .then(result => {
        const items = result.rows[0];
        console.log(items)
        res.render('items', items)
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
