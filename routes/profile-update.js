const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');
const { application } = require('express');
const express = require('express');
const router  = express.Router();

const pool = new Pool({
  user: 'alex',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});
