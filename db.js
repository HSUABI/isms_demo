const mysql = require('mysql');
const db_config = require('./config/db-config.json');

// 데이터베이스 연결 설정
const db = mysql.createConnection({
  host: db_config.host,
  user: db_config.user,
  port: db_config.port,
  password: db_config.password,
  database: db_config.database,
  ssl: {
    rejectUnauthorized: false,
  },
});

db.connect((err) => {
  if (err) throw err;
  console.log('Database connected!');
});

module.exports = db;
