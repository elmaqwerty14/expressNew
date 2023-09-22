const express = require('express');
const { route } = require('./users');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { body, validationResult } = require('express-validator');

const prisma = new PrismaClient();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/barang', async (req, res) => {
  const page = req.query.page || 1; // Halaman yang diminta (default: 1)
  const perPage = 5; // Jumlah item per halaman

  const searchQuery = req.query.search;
  let barang;

  const whereCondition = searchQuery ? {
      nama:{
        startsWith: `${searchQuery}`,
        mode: 'insensitive'
      },
    }
    : {};

  const totalItems = await prisma.barang.count({
    where: whereCondition,
  });

  if (searchQuery) {
    barang = await prisma.barang.findMany({
      select: {
        id: true,
        nama: true,
        harga: true,
        stok: true,
      },
      where: whereCondition,
      orderBy: {
        id: 'asc',
      },
      skip: (page - 1) * perPage, // Menghitung offset
      take: perPage, // Jumlah item per halaman
    });
  } else {
    barang = await prisma.barang.findMany({
      select: {
        id: true,
        nama: true,
        harga: true,
        stok: true,
      },
      orderBy: {
        id: 'asc',
      },
      skip: (page - 1) * perPage, // Menghitung offset
      take: perPage, // Jumlah item per halaman
    });
  }

  res.render('barang', {
    barang,
    success: req.flash('success'),
    currentPage: parseInt(page),
    totalPages: Math.ceil(totalItems / perPage), // Menghitung total halaman
  });
});



// Tambah barang
router.get('/tambahbarang', async (req, res) => {
  res.render('tambahbarang', {
    error: req.flash("error")
  }); // Render halaman tambahbarang.ejs
});

router.post('/tambahbarang',
  body('nama').notEmpty(),
  body('harga')
    .notEmpty().withMessage("harga wajib diisi")
    .isInt().withMessage("harga harus diisi angka"),
  body('stok')
    .notEmpty().withMessage("stok wajib diisi")
    .isInt().withMessage("stok harus diisi angka"),
  async (req, res) => {
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
      req.flash("error", validationError.array());
      return res.redirect('/tambahbarang');
    }

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

    req.flash("success", "Berhasil menambah data barang");
    return res.redirect('/barang');
  });


// Edit barang - Render the editbarang.ejs template
router.get('/editbarang/:id', async (req, res) => {
  const itemId = req.params.id;
  const itemToEdit = await prisma.barang.findUnique({
    where: { id: parseInt(itemId) },
  });
  res.render('editbarang', { 
    item: itemToEdit,
    error: req.flash("error")
  });
});


// Route untuk mengedit data barang berdasarkan ID
router.post('/updateBarang/:id', 
  body('nama').notEmpty(),
    body('harga')
      .notEmpty().withMessage("harga wajib diisi")
      .isInt().withMessage("harga harus diisi angka"),
    body('stok')
      .notEmpty().withMessage("stok wajib diisi")
      .isInt().withMessage("stok harus diisi angka"),

    async (req, res) => {
      const validationError = validationResult(req);
      if (!validationError.isEmpty()) {
        req.flash("error", validationError.array());
        return res.redirect('/editbarang'+req.params.id);
      }

      const { id } = req.params;
      const { nama, harga, stok } = req.body;


      await prisma.barang.update({
        where: { id: parseInt(id) },
        data: {
          nama: nama,
          harga: Number(harga),
          stok: Number(stok),
        },
      });
    
    req.flash("success", "Berhasil edit data barang");
    return res.redirect('/barang');
    }
    );



    router.get('/hapusBarang/:id', async (req, res) => {
      const { id } = req.params; // Mengambil ID dari parameter URL
    
      await prisma.barang.delete({
        where: { id: parseInt(id) }, // Menggunakan parseInt karena ID biasanya berupa angka
      });
    
      res.redirect('/barang');
    });

module.exports = router;
