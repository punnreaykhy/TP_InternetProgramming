const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();

const allowedOrigins = ['http://localhost:3000', 'http://192.168.100.63:3000'];
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true }));
// parse application/json
app.use(bodyParser.json());


// Connect session
require('./configs/session')(app);

// Connect mongodb
require('./configs/db')();

app.use(require('./routes/index'))
app.use('/uploads', express.static('uploads'))

app.listen(process.env.PORT || 3001, () => console.log('App avaiable on http://localhost:3001'))

