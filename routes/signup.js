const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('signup', {
    // 랜더링 데이터
    data: {},
  });
});

router.post('/', (req, res) => {
  console.debug(req.body);
  const { id, pw, name, email, phone, branch, unit, systems } = req.body;

  // TODO: 백엔드에서 원하는대로 처리
  if (id === 'admin') {
    req.session.message = '이미 등록된 아이디입니다.';
    res.render('signup', {
      // 랜더링 데이터
      data: {},
    });
    return;
  }

  req.session.user = id;
  req.session.message = '회원가입이 완료되었습니다.';
  res.redirect('/login');
});

module.exports = router;
