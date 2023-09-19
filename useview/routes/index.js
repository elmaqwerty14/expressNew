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


module.exports = router;
