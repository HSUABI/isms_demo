const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  if (req.session.loggedin) {
    res.render('main', {
      // 랜더링 데이터
      data: {
        navbar: {
          active: 'main',
        },
        systems: [
          {
            key: '1',
            name: '중앙대학교 전산시스템',
          },
          {
            key: '2',
            name: '고려대학교 전산시스템',
          },
          {
            key: '3',
            name: '연세대학교 전산시스템',
          },
        ],
        window: {
          yearStatistics: [
            [2020, 51],
            [2021, 78],
            [2022, 20],
            [2023, 84],
          ],
          detailStatistics: {
            management: [53.4, 34.2, 12.4],
            protection: [80.4, 6.2, 13.4],
            privacy: [10.4, 28.2, 61.4],
          },
        },
      },
    });
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
