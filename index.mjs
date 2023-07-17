// const express = require('express');
// const pool = require('./connection.js');
// const app = express()
// const port = 3000

// app.get('/', (req, res) => {
//   // query database
//   pool.query('SELECT * FROM tabelpertama', (error, results) => {
//     if (error) {
//       throw error;
//     }
//     res.send(results.rows);
//   });
// })

// // app.get ('/', function (req, res) {
// //    res.send('Hello World!')
// // })

// // app.listen(port, () => {
// //   console.log(`Example app listening on port ${port}`)
// // })

// app.listen(port, function()  {
//   console.log(`Example app listening on port ${port}`)
// })

// const express = require("express");
import express from 'express';
// const {} = require('express'); // Cara lain import,  kalau mau tau file apa saja yang bisa di 
                              //  --- import pake CTRL + SPASI

// const pool = require("./connection.js"); // require berarti pake comen js
import pool from './connection.js';

const app = express();
const port = 3000;
//  console.log(pool);

import { hi } from  "./latihan.mjs"
console.log(hi())
import { hello } from  "./latihan.mjs"
console.log(hello())

app.get("/", (req, res) => {
  // query database
  pool.query("SELECT * FROM tabelpertama", (error, results) => {
    if (error) {
      throw error; // throw mirip kayak return tapi lebih spesifik untuk erro handling
    }
    res.send(results.rows);
  });
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}`);
});

// NOTE : how to run file
// npm run start : menjalankan key start -> node index.mjs
// node index.mjs
