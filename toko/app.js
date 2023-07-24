const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const barangRouter = require('./src/barang/barang.controler');
const app = express();
app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/barang', barangRouter);

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

module.exports = app;
