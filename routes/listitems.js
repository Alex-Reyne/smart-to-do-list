const express = require('express');
const router  = express.Router();
const { booksApis, moviesApi, foodApi} = require('../lib/apis.js')


const userItems = (db) => {
  router.get("/", (req, res) => {
    const id = req.session.user_id

  if (!id) {
    return res.redirect('login')
  }
    db.query(`SELECT items.*, items.id as item_id, users.*
    FROM items
    JOIN users ON users.id = user_id
    WHERE users.id = ${id}
    AND items.delete_date_time IS null;`)
      .then(result => {
        const items = result.rows;
        const listItems = [];
        const IdList = [];
        for (const i of items) {
          listItems.push(i.name)
        }
        for (const listID of items) {
          IdList.push(listID.list_id)
        }

        const itemAndId = {};
        for (let no of items) {

          if (!itemAndId[no.list_id]) {
            itemAndId[no.list_id] = {};
          }

          itemAndId[no.list_id][no.item_id] = no.name;
        }


        const joinArr = listItems.map((element, index) => element + IdList[index]);
        const templateVars = {
          user_id: items[0].id,
          email: items[0].email,
          username: items[0].username,
          profile_pic: items[0].profile_pic,
          tasks: joinArr,
          itemAndId

        }

        res.render('lists', templateVars)
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
    } else {
      foodApi(item)
      .then((result) => {

        if (result) {
          db.query(`INSERT INTO items
          (name, list_id, user_id) VALUES ('${item}', 2, ${id})
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
          booksApis(item).then(result => {

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

      db.query(`INSERT INTO items
      (name, list_id, user_id) VALUES ('${item}', ${listId}, ${id})
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
    });


  return router;
};
module.exports = userItems;
