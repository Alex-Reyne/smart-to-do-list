const { application } = require('express');
const express = require('express');
const router  = express.Router();

router.post("/logout", (req, res) => {
  console.log(res)
  req.session.id = null; // delete users cookies
  res.redirect('/login');
});


module.exports = router;
