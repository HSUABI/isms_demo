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
          email: 'song@naver.com',
          phone: '010-1234-5678',
          branch: {
            id: 'M01',
            name: '공군',
          },
          team: {
            id: 'TEAM01',
            name: '4284부대',
          },
          systems: [
            {
              id: 'S01',
              name: '중앙대학교 전산시스템',
            },
            {
              id: 'S02',
              name: '아주대학교 전산시스템',
            },
            {
              id: 'S03',
              name: '공군사관학교 전산체계',
            },
          ],
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
