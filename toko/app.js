const express = require("express");
const port = 3000;
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const barangRouter = require("./src/barang/barang.controler");
const transaksiRouter = require("./src/transaksi/transaksi.controler");
const userRouter = require("./src/user/user.controler");
const cartRouter = require("./src/cart/cart.controler");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

function penambahanDuaAngka(angka1, angka2) {
  return angka1 + angka2;
}

function pengkuadratanAngka1DenganAngka2(angka1, angka2) {
  return angka1 ** angka2;
}

function operasiDuaAngka(angka1, angka2, fungsiOperasiAngka) {
  const pi = 3.14;
  return fungsiOperasiAngka(angka1, pi);
}


app.post("/kuadrat", (req, res) => {
  const { angka1, angka2 } = req.body;
  const hasilKali = operasiDuaAngka(
    angka1,
    angka2,
    (angka1, angka2) => angka1 * angka2
  );
  res.json(hasilKali);
});

// Fungsi untuk menggabungkan dua string
function gabungString(string1, string2, callback) {
  const hasil = string1 + " " + string2;
  callback(hasil); 
}

// Fungsi untuk menampilkan hasil
function tampilkanHasil(hasil) {
  console.log("Hasil: " + hasil);
}

app.post("/gabung", (req, res) => {
  const { string1, string2 } = req.body;
  gabungString(string1, string2, (hasil) => {
    res.json({ result: hasil }); 
  });
});


app.use("/", indexRouter);
app.use("/barang", barangRouter);
app.use("/transaksi", transaksiRouter);
app.use("/user", userRouter);
app.use("/cart", cartRouter);
// app.get("/calback")
// app.use('/', indexRouter);
// app.use('/users', usersRouter);

module.exports = app;
