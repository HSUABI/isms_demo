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

let data = [];
let titleData = null;

db.query(
    'SELECT class1, class2, class3, title, ' +
    'score1, score2, score3, grade FROM isms ' +
    'WHERE system_id=? and class1=?',
    ['S01', 1],
    (err, results) => {
        results.forEach((element, idx) => {
            // is title
            if (element.class3 == null) {
                if (titleData != null) {
                    data.push(titleData);
                }
                titleData = {};
                titleData.name = element.title;
                titleData.score = [element.score1, element.score2, element.score3];
                titleData.subs = [];
            } else {
                titleData.subs.push({
                    name: element.title,
                    grade: element.grade
                });
            }
        });
        data.push(titleData);
        console.log(data);
    }
)
