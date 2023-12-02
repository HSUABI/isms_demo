const express = require('express');
const router = express.Router();

router.get('/:type', (req, res) => {
  if (req.session.loggedin) {
    res.render('isms', {
      // 랜더링 데이터
      data: {
        navbar: {
          active: 'isms',
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
      },
    });
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
