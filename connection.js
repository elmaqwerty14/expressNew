const { Pool } = require('pg');

// Konfigurasi koneksi database
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'ELMAKIU14042002',
  port: 5433, // Port default PostgreSQL
});

module.exports = pool;