const express = require('express');
const path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/api/users');
var PerfumeRouter = require('./routes/api/perfumes');
var collectRouter = require('./routes/api/collections');
var shequRouter = require('./routes/api/shequ');

const app = express();





app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
require('./config/passport')(passport);



app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/perfumes', PerfumeRouter);
app.use('/api/collections', collectRouter);
app.use('/api/shequ', shequRouter);







const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});