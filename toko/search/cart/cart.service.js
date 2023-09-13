const client = require('../../koneksiClient.js');
const express = require("express");
const port = 3000;
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
  
client.connect(handleError);

function handleError(error) {
  if (error) {
    console.error('Error connecting to database: ' + error);
  }
}
//   client.query('SELECT * FROM keranjang')
//     .then(result => {
//       // Lakukan sesuatu dengan hasil kueri di sini
//       console.log(result.rows);
//     })
//     .catch(err => {
//       console.error('Kesalahan saat menjalankan kueri', err);
//     });


// Rute untuk menjalankan kueri ke database
app.get('/queryDatabaseCart', (req, res) => {
    client.query('SELECT * FROM keranjang')
      .then(result => {
        res.json(result.rows);
      })
      .catch(err => {
        console.error('Kesalahan saat menjalankan kueri', err);
        res.status(500).json({ error: 'Kesalahan saat menjalankan kueri' });
      });
  });

  app.post('/insertCart', (req, res) => {
    const { nama_produk, jumlah_produk, harga_produk } = req.body;

  
    const query = {
      text: 'INSERT INTO keranjang (nama_produk, jumlah_produk, harga_produk) VALUES ($1, $2, $3)',
      values: [nama_produk, jumlah_produk, harga_produk],
    };
  
    client.query(query)
      .then(() => {
        res.status(201).json({ message: 'Data berhasil ditambahkan' });
      })
      .catch(err => {
        console.error('Kesalahan saat mengimput data', err);
        res.status(500).json({ error: 'Kesalahan saat mengimput data' });
      });
  });

// Rute untuk mengedit data dalam tabel barang
app.put('/editCart/:id', (req, res) => {
    const { nama_produk, jumlah_produk, harga_produk } = req.body;
    const id_keranjang = req.params.id; // Ambil ID keranjang dari parameter URL
  
    // Lakukan validasi data jika diperlukan
  
    const query = {
      text: 'UPDATE keranjang SET nama_produk = $1, jumlah_produk = $2, harga_produk = $3 WHERE id_keranjang = $4',
      values: [nama_produk, jumlah_produk, harga_produk, id_keranjang],
    };
  
    client.query(query)
      .then(() => {
        res.json({ message: 'Data berhasil diubah' });
      })
      .catch(err => {
        console.error('Kesalahan saat mengedit data', err);
        res.status(500).json({ error: 'Kesalahan saat mengedit data' });
      });
  });
  
 // Rute untuk menghapus produk berdasarkan ID
 app.delete('/deleteCart/:id', (req, res) => {
    const id_keranjang = req.params.id; // Ambil ID produk dari parameter URL
  
    // Lakukan validasi data jika diperlukan
  
    const query = {
      text: 'DELETE FROM keranjang WHERE id_keranjang = $1',
      values: [id_keranjang],
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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

