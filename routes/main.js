const express = require('express');
const router = express.Router();

function renderMain(req, res) {
  res.render('main', {
    // 랜더링 데이터
    data: {
      navbar: {
        active: 'main',
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
      // 웹 브라우저의 window.data 객체 안에 저장되는 값
      window: {
        yearStatistics: [
          [2020, 51], // 년도, 점수
          [2021, 78],
          [2022, 20],
          [2023, 84],
        ],
        detailStatistics: {
          management: [6, 3, 7], // 우수개수, 보통개수, 미흡개수
          protection: [40, 16, 8],
          privacy: [4, 7, 10],
        },
      },
    },
  });
}

router.get('/', (req, res) => {
  if (req.session.loggedin) {
    renderMain(req, res);
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
