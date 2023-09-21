const express = require('express');
const { route } = require('./users');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/barang', async (req, res) => {
  const judul = "shdjadjhjashjda";
  const barang = await prisma.barang.findMany({
    select: {
      id: true,
      nama: true,
      stok: true,
      harga: true
    }
  });

  res.render('barang', {
    judul,
    barang
  });
});

  // Tambah barang
router.get('/tambahbarang', async (req, res) => {
  res.render('tambahbarang'); // Render halaman tambahbarang.ejs


router.post('/tambahbarang', async (req, res) => {
  const { nama, harga, stok } = req.body;
  
  // Mengonversi harga dan stok menjadi angka (number)
  const hargaNumber = parseFloat(harga);
  const stokNumber = parseInt(stok);

  await prisma.barang.create({
    data: {
      nama: nama,
      harga: hargaNumber,
      stok: stokNumber
    }
  });

  return res.status(200).json({
    message: "Data barang berhasil ditambahkan"
  });
});
});

// Edit barang - Render the editbarang.ejs template
router.get('/editbarang/:id', async (req, res) => {
  const itemId = req.params.id;
  const itemToEdit = await prisma.barang.findUnique({
      where: { id: parseInt(itemId) },
  });
  res.render('editbarang', { item: itemToEdit });
});

  
// Route untuk mengedit data barang berdasarkan ID
router.put('/updateBarang/:id', async (req, res) => {
  console.log('Update barang route reached');
  const { id } = req.params; // Mengambil ID dari parameter URL
  const { nama, harga, stok } = req.body; // Mengambil data yang akan diubah dari permintaan

  await prisma.barang.update({
    where: { id: parseInt(id) }, // Menggunakan parseInt karena ID biasanya berupa angka
    data: {
      nama,
      harga,
      stok,
    },
  });

  res.redirect('/barang'); 
  });

module.exports = router;
