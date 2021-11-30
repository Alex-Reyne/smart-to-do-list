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

    let listId = 4;
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
    } else {
      foodApi(item)
      .then((result) => {
        console.log('item in food: ', item)
        console.log('result in food: ', result)
        if (result) {
          db.query(`INSERT INTO items
          (name, list_id, user_id) VALUES ('${item}', 2, ${id})
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
        } else {
          booksApis(item).then(result => {
            console.log('item in books: ', item)
            console.log('result in books: ', result)
            if (result) {
              db.query(`INSERT INTO items
              (name, list_id, user_id) VALUES ('${item}', 3, ${id})
              RETURNING *;
              `)
              .then(result => {
                res.redirect("/lists")
              })
              .catch(err => {
                res
                  .status(500)
                  .json({error: err.message});
              })
            } else {
              moviesApi(item).then((result) => {
                console.log('item in movies: ', item)
                console.log('result in movies: ', result)
                if (result) {
                db.query(`INSERT INTO items
                  (name, list_id, user_id) VALUES ('${item}', 1, ${id})
                  RETURNING *;
                  `)
                  .then(result => {
                      res.redirect('/lists');
                    })
                  .catch(err => {
                    res
                      .status(500)
                      .json({ error: err.message });
                  });
                } else {
                  db.query(`INSERT INTO items
                  (name, list_id, user_id) VALUES ('${item}', 4, ${id})
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
                }
              })
            }
          })
        }
      });
      return router;
    }

  });
  return router;
};
module.exports = userItems;
