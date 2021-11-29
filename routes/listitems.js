const { application } = require('express');
const express = require('express');
const router  = express.Router();
const { wolfRam } = require('../lib/apis.js')
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
    } else

    // if no stings match, look in the api data.#add
    // api logic:
    // http://api.wolframalpha.com/v2/query?appid=DEMO&input=tides%20seattle&output=json

    const keyWords = []

    if (wolfRam(item).includes('')) {

    };
    //

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

  return router;
};
module.exports = userItems;
