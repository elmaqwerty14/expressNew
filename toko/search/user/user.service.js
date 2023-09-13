const client = require('../../koneksiClient.js');
const express = require("express");
const port = 3003;
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

client.connect((error) => {
  if (error) {
    console.error('Error connecting to database: ' + error);
  }
});

app.get('/queryDatabaseUser', (req, res) => {
  client.query('SELECT * FROM user')
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      console.error('Error querying the database', err);
      res.status(500).json({ error: 'Error querying the database' });
    });
});

app.post('/insertUser', (req, res) => {
  const { nama_user } = req.body;

  // if (!nama_user) {
  //   return res.status(400).json({ error: 'Nama user is required' });
  // }

  const query = {
    text: 'INSERT INTO user (nama_user) VALUES ($1)',
    values: [nama_user],
  };

client.query(query)
  .then(() => {
    console.log('Data inserted successfully');
    res.status(201).json({ message: 'Data berhasil ditambahkan' });
  })
  .catch(err => {
    console.error('Error inserting data:', err);
    res.status(500).json({ error: 'Error inserting data' });
  });

});

app.put('/editUser/:id', (req, res) => {
  const { nama_user } = req.body;
  const id_pembeli = req.params.id;

  if (!nama_user) {
    return res.status(400).json({ error: 'Nama user is required' });
  }

  const query = {
    text: 'UPDATE user SET nama_user = $1 WHERE id_pembeli = $2',
    values: [nama_user, id_pembeli],
  };

  client.query(query)
    .then(() => {
      res.json({ message: 'Data berhasil diubah' });
    })
    .catch(err => {
      console.error('Error editing data', err);
      res.status(500).json({ error: 'Error editing data' });
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
