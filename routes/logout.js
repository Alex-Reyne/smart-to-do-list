const express = require('express');
const router  = express.Router();

router.post("/", (req, res) => {
  req.session = null; // delete users cookies
  res.redirect('/login');
});


module.exports = router;
