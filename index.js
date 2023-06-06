const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
var session = require('express-session')

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true }));
// parse application/json
app.use(bodyParser.json());


app.use(session({
  secret: 'my-secret',
  resave: true,
  rolling: true,
  saveUninitialized: true, 
  name: 'access_token',
  cookie: {
    maxAge: 1000 * 60 * 60 * 2, // 2 hours
    secure: false,
  }
}))

// Connect mongodb
require('./configs/db')();

app.use(require('./routes'))

app.listen(process.env.PORT || 3001, () => console.log('App avaiable on http://localhost:3001'))

