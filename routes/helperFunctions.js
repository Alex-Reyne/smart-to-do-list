const bcrypt = require("bcryptjs");


const login = function(email, password, db) {
  const query = `SELECT * FROM users WHERE email = $1`;
  const value = [email.toLowerCase() || 'null'];
  const hashedPassword = bcrypt.hashSync(password, 10);

  return db.query(query, value)
    .then(res => res.rows[0])
    .then(res => {
      if (res !== undefined && bcrypt.compareSync(res.password, hashedPassword)) {
        return res;
      }
      return null;
    })
    .catch((err, res) => res.send(err));
};


const addUser = function(user, db) {
  let query = `
  INSERT into users (username, email, password)
  VALUES ($1, $2, $3)
  RETURNING *
  `;
  const values = [user.username, user.email, bcrypt.hashSync(user.password, 10)];
  return db.query(query, values)
    .then(res => res.rows[0])
    .catch(err => console.error('query error', err.stack));
};



module.exports = {
  login,
  addUser
};
