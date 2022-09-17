const express = require('express');

const protectRoutesMiddleware = require('./middlewares/protect-routes');
const db = require('./data/data');
const authRoutes = require('./routes/auth.routes');
const mainRoutes = require('./routes/main-routes');
const adminRoutes = require('./routes/admin.routes');

const app = express();

app.use(express.urlencoded({extended: false}));

app.use(express.json());

app.use(authRoutes);
app.use('/main', mainRoutes);
app.use('/admin', adminRoutes);

db.connectToDatabase()
  .then( function () {
    app.listen(3001);
  })
  .catch(function (error) {
    console.log('Failed to connect to the database!');
    console.log(error);
  });