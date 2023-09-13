const { json } = require('body-parser');
const {
  Router
} = require('express');

const client = require('../../koneksi.js');
const router = Router();
router.get('/queryDatabaseUser', (req, res) => {
  client.query('SELECT * FROM user')  // Use double quotes around "user"
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      console.error('Error querying the database', err);
      res.status(500).json({ error: 'Error querying the database' });
    });
});

router.post('/insertUser', (req, res) => {
  const { nama_pembeli, token_user } = req.body;

  const query = {
    text: 'INSERT INTO user (nama_pembeli, token_user) VALUES ($1, $2)',  // Use double quotes around "user"
    values: [nama_pembeli, token_user],
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

router.put('/editUser/:id', (req, res) => {
  const { nama_pembeli, token_user } = req.body;
  const id_pembeli = req.params.id;

  const query = {
    text: 'UPDATE user SET nama_pembeli = $1, token_user = $2 WHERE id_pembeli = $3', 
    values: [nama_pembeli, token_user, id_pembeli],
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

 // Rute untuk menghapus produk berdasarkan ID
 router.delete('/deleteUser/:id', (req, res) => {
  const id_pembeli = req.params.id; // Ambil ID produk dari parameter URL

  // Lakukan validasi data jika diperlukan

  const query = {
    text: 'DELETE FROM user WHERE id_pembeli = $1',
    values: [id_pembeli],
  };

  client.query(query)
    .then(() => {
      res.json({ message: 'Data berhasil dihapus' });
    })
    .catch(err => {
      console.error('Kesalahan saat menghapus data', err);
      res.status(500).json({ error: 'Kesalahan saat menghapus data' });
    });
});

router.post('/registerUser', (req, res) => {
  const { nama_pembeli, token_user } = req.body;

  // Periksa apakah nama_pembeli atau token_user sudah terdaftar sebelumnya
  const checkQuery = {
    text: 'SELECT * FROM user WHERE nama_pembeli = $1 OR token_user = $2',
    values: [nama_pembeli, token_user],
  };

  client.query(checkQuery)
    .then(result => {
      if (result.rows.length > 0) {
        // Jika nama_pembeli atau token_user sudah terdaftar, kirim respons error
        res.status(400).json({ error: 'Nama pengguna atau token sudah terdaftar' });
      } else {
        // Jika tidak ada nama_pembeli atau token_user yang sama, lakukan penyisipan
        const insertQuery = {
          text: 'INSERT INTO user (nama_pembeli, token_user) VALUES ($1, $2)',
          values: [nama_pembeli, token_user],
        };

        client.query(insertQuery)
          .then(() => {
            console.log('Pengguna berhasil terdaftar');
            res.status(201).json({ message: 'Pengguna berhasil terdaftar' });
          })
          .catch(err => {
            console.error('Kesalahan saat mendaftarkan pengguna:', err);
            res.status(500).json({ error: 'Kesalahan saat mendaftarkan pengguna' });
          });
      }
    })
    .catch(err => {
      console.error('Kesalahan saat memeriksa pengguna yang sudah terdaftar:', err);
      res.status(500).json({ error: 'Kesalahan saat memeriksa pengguna yang sudah terdaftar' });
    });
});


module.exports = router;