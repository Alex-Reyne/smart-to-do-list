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
    // console.log(templateVars)
    return res.render('items', templateVars)
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
        // console.log(listItems)
        for (const listID of items) {
          IdList.push(listID.list_id)
        }
        // console.log(IdList)
        // console.log('items in listitems: ', items)
        const joinArr = listItems.map((element, index) => element + IdList[index]);
        // console.log(joinArr)
        const templateVars = {
          user_id: items[0].id,
          email: items[0].email,
          username: items[0].username,
          profile_pic: items[0].profile_pic,
          tasks: joinArr
        }

        // console.log(templateVars)
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
    // console.log('items', item);



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
