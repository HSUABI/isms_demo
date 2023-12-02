const express = require('express');
const router = express.Router();

function renderSignup(req, res) {
  res.render('signup', {
    // 랜더링 데이터
    data: {
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
        {
          id: 'S04',
          name: '공군 자료교환체계',
        },
        {
          id: 'S05',
          name: '공군 알림톡체계',
        },
        {
          id: 'S06',
          name: '육군 자료교환체계',
        },
        {
          id: 'S07',
          name: '국직 자료교환체계',
        },
        {
          id: 'S08',
          name: '해군 자료교환체계',
        },
      ],
    },
  });
}

router.get('/', (req, res) => {
  renderSignup(req, res);
});

router.post('/', (req, res) => {
  console.debug(req.body);
  const { id, pw, name, email, phone, branch, team, systems } = req.body;

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
