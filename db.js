const mysql = require('mysql');

// 데이터베이스 연결 설정
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port : '3306',
  password: '1234',
  database: 'test2'
});

db.connect(err => {
  if (err) throw err;
  console.log('Database connected!');
});

module.exports = db;
