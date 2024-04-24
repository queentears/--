const express = require('express');
const path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const db = require('./db');//测试连接



const app = express();


var indexRouter = require('./routers/index');



app.use(express.static(path.join(__dirname, 'public')));






app.use('/', indexRouter);








const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});