const express = require('express');
const conn = require("../dbconn/dbconn");
const db = require('./../db')
const router = express.Router();

function renderSignup(req, res) {
  conn.getSystemList((systems) => {
    conn.getTeamList((teams) => {
      res.render('signup', {
        // 랜더링 데이터
        data: {
          systems: systems,
          teams: teams
        },
      });
    });
  });
}

router.get('/', (req, res) => {
  renderSignup(req, res);
});

router.post('/', (req, res) => {
  console.debug(req.body);
  const { id, pw, name, email, phone, branch, team, systems, ip } = req.body;

  console.log(ip);

  db.query(
    "INSERT INTO user (user_id, password, user_name, " +
    "affiliation, team_id, is_confirmed, " +
    "is_admin, ip) VALUES " +
    "(?, ?, ?, ?, ?, ?, ?, ?)",
    [id, pw, name, branch, team, 0, 0, ip]
  );

  systems.forEach((element) => {
    db.query(
      "INSERT INTO SYSTEM_USER (system_id, user_id) VALUES (?, ?)",
      [element, id]
    );
  });

  // TODO: 백엔드에서 원하는대로 처리
  if (id === 'admin') {
    req.session.alert = '이미 등록된 아이디입니다.';
    // req.session.toast = '이미 등록된 아이디입니다.';
    renderSignup(req, res);
    return;
  }

  req.session.user = id;
  // req.session.alert = '회원가입이 완료되었습니다.';
  req.session.toast = '회원가입이 완료되었습니다.';
  res.redirect('/login');
});

module.exports = router;
