const express = require('express');
const router  = express.Router();

const deleteItem = (db) => {
  router.post("/", (req, res) => {
    const id = req.body.id;

    // console.log(req.body);
    db.query(`UPDATE items SET delete_date_time = Now() WHERE id = ${id};`)
      .then(data => {
        console.log('data: ', data);
        return res.status(200).json({});
      })
      .catch(err => {
        console.log('ERROR:', err)
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};

module.exports = deleteItem;
