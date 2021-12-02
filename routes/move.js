const express = require('express');
const router  = express.Router();

const moveItem = (db) => {
  router.post("/", (req, res) => {
    const list_id = req.body.list_id;
    const item_id = req.body.item_id;
    // console.log(req.body);
    db.query(`UPDATE items SET list_id = ${list_id} WHERE id = ${item_id};`)
      .then(data => {
        // console.log('data: ', data);
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

module.exports = moveItem;
