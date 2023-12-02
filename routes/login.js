const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('login', {
    // 랜더링 데이터
    data: {},
  });
});

router.post('/', (req, res) => {
  const username = req.body.id;
  const password = req.body.pw;

  db.query(
    'SELECT * FROM account WHERE id = ? AND pw = ?',
    [username, password],
    (err, results) => {
      if (err) throw err;
      if (results.length > 0) {
        req.session.loggedin = true; // 세션에 로그인 상태 저장
        req.session.username = username;
        req.session.user = {
          id: username,
          name: '송성욱',
          team: {
            id: 'TEAM01',
            name: '4284부대',
          },
        };
        res.redirect('/');
      } else {
        req.session.alert = '로그인에 실패하였습니다.';
        res.redirect('/login');
      }
    }
  );
});

module.exports = router;
