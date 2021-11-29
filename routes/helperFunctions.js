const bcrypt = require("bcrypt");


const login = function(email, password, db) {
  const query = `SELECT * FROM users WHERE email = $1`;
  const value = [email.toLowerCase() || 'null'];
  return db.query(query, value)
    .then(res => res.rows[0])
    .then(res => {
      if(res !== undefined && bcrypt.compareSync(password, res.password)) {
        return res;
      }
      return null;
    })
    .catch((err, res) => res.send(err));
};


module.exports = {
  login
};
