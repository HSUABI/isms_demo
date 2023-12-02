const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  if (req.session.loggedin) {
    res.render('resource', {
      // 랜더링 데이터
      data: {
        navbar: {
          active: 'resource',
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
