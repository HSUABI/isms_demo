const express = require('express');
const path = require('path'); // path 모듈 추가
const router = express.Router();

router.get('/', (req, res) => {
  if (req.session.loggedin) {
    res.render('main', {
      // 랜더링 데이터
      data: {},
    });
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
