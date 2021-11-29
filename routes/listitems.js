const { application } = require('express');
const express = require('express');
const router  = express.Router();

const userItems = (db) => {
  router.get("/", (req, res) => {
    const id = req.session.user_id

  if (!id) {
    const templateVars = {
      user_id: null,
      email: null,
      username: null,
      profile_pic: null
    }

    console.log(templateVars)
    return res.render('items', templateVars)
  }
    db.query(`SELECT *
    FROM users WHERE id = ${id};`)
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
        res.render('items', templateVars)
        return items;
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  router.post("/", (req, res) => {

    let listId = 0;
    const item = req.body.item;
    const id = req.session.user_id;
    console.log('items', item);

    if (item.includes('watch')) {
      listId = 1;
    }
    else if (item.includes('eat')) {
      listId = 2;
    }
    else if (item.includes('read')) {
      listId = 3;
    }
    else if (item.includes('buy')) {
      listId = 4;
    }
    console.log(listId)
    db.query(`INSERT INTO items
    (name, list_id, user_id) VALUES ('${item}', ${listId}, ${id})
    RETURNING *;
    `)
    // console.log('req', item)
    .then(result => {
      res.redirect('/lists');
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  })

  // app.post("/urls", (req, res) => {
  //   const shortGen = generateRandomString();
  //   const userid = req.session.id;

  //   if (!userid) {
  //     return res.sendStatus(403); // prevents people from creating new urls using cURL in terminal;
  //   }

  //   urlDatabase[shortGen] = { longURL: req.body.longURL, userID: req.session.id };
  //   res.redirect(`/urls/${shortGen}`);
  // });


  return router;
};
module.exports = userItems;
