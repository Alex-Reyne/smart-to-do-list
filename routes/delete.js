const express = require('express');
const router  = express.Router();

const deleteItem = (db) => {
  router.post("/", (req, res) => {

    console.log(req.body.rows);
    db.query(`SELECT * FROM items WHERE id = 1`)
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};

module.exports = deleteItem;
