const { json } = require('body-parser');
const {
  Router
} = require('express');

const router = Router();
// Rute untuk menjalankan kueri ke database
router.get('/queryDatabase', (req, res) => {
    client.query('SELECT * FROM produk')
      .then(result => {
        res.json(result.rows);
      })
      .catch(err => {
        console.error('Kesalahan saat menjalankan kueri', err);
        res.status(500).json({ error: 'Kesalahan saat menjalankan kueri' });
      });
  });

  router.post('/insertProduct', (req, res) => {
    const { nama_produk, harga_produk, stok_produk } = req.body;

  
    const query = {
      text: 'INSERT INTO produk (nama_produk, harga_produk, stok_produk) VALUES ($1, $2, $3)',
      values: [nama_produk, harga_produk, stok_produk],
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
router.put('/editProduct/:id', (req, res) => {
    const { nama_produk, harga_produk, stok_produk } = req.body;
    const id_produk = req.params.id; // Ambil ID produk dari parameter URL
  
    // Lakukan validasi data jika diperlukan
  
    const query = {
      text: 'UPDATE produk SET nama_produk = $1, harga_produk = $2, stok_produk = $3 WHERE id_produk = $4',
      values: [nama_produk, harga_produk, stok_produk, id_produk],
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
router.delete('/deleteProduct/:id', (req, res) => {
  const id_produk = req.params.id; // Ambil ID produk dari parameter URL

  // Lakukan validasi data jika diperlukan

  const query = {
    text: 'DELETE FROM produk WHERE id_produk = $1',
    values: [id_produk],
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

