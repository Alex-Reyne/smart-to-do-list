const { application } = require('express');
const express = require('express');
const router  = express.Router();
const { wolfRam, booksApis, moviesApi, foodApi} = require('../lib/apis.js')


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
    const item = req.body.item.toLowerCase();
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

    // const keyWords = []

    // first
    // wolfRam(item);
    // television program for watch cat

    // second
   if (foodApi(item)
        .then((res) => {
          for (const name of res) {
            if (name.toLowerCase().includes(item)) {
              return true;
            }
          }
        })) { listId = 2 };
    // if array greater than 0

    // third
    // moviesApi(item);
    // feature, video, TV series,

    // if movie title exact match and type (q) is "feature, video, or TV series" then win.
    // movies API {
    //   d: [
    //     {
    //       id: 'tt0419685',
    //       l: 'Dien, Chinh, Chung und Tung - Lebensversuche in Vietnam',
    //       q: 'TV movie',
    //       rank: 1186892,
    //       y: 1990
    //     },

    // last only if book title is exact match
    // booksApis(item);

    // if (wolfRam(item).includes('')) {

    // };
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
