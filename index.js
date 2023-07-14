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

const express = require("express");

const pool = require("./connection.js");

const app = express();
const port = 3000;
//  console.log(pool);
app.get("/", (req, res) => {
  // query database
  pool.query("SELECT * FROM tabelpertama", (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results.rows);
  });
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}`);
});
