const { application } = require('express');
const express = require('express');
const router  = express.Router();

router.post("/", (req, res) => {
  console.log(req.session)
  req.session = null; // delete users cookies
  res.redirect('/login');
});


module.exports = router;
