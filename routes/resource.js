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
        // 웹 브라우저의 window.data 객체 안에 저장되는 값
        window: {
          mainStatistics: [
            // 네트워크개수, 서버개수, PC개수, 보안장비개수, DB개수, 웹개수
            20, 6, 17, 10, 10, 2,
          ],
          detailStatistics: [
            {
              type: '1', // 네트워크
              categories: [
                {
                  name: 'Cisco', // 종류
                  value: 4, // 개수
                },
                {
                  name: 'Alteon', // 종류
                  value: 2, // 개수
                },
                {
                  name: 'Passport', // 종류
                  value: 6, // 개수
                },
                {
                  name: '기타', // 종류
                  value: 8, // 개수
                },
              ],
            },
            {
              type: '2', // 서버
              categories: [
                {
                  name: '테스트', // 종류
                  value: 30, // 개수
                },
                {
                  name: '기타', // 종류
                  value: 8, // 개수
                },
              ],
            },
            {
              type: '3', // PC
              categories: [
                {
                  name: '테스트', // 종류
                  value: 30, // 개수
                },
                {
                  name: '기타', // 종류
                  value: 8, // 개수
                },
              ],
            },
            {
              type: '4', // 보안장비
              categories: [
                {
                  name: '테스트', // 종류
                  value: 30, // 개수
                },
                {
                  name: '기타', // 종류
                  value: 8, // 개수
                },
              ],
            },
            {
              type: '5', // DB
              categories: [
                {
                  name: '테스트', // 종류
                  value: 30, // 개수
                },
                {
                  name: '기타', // 종류
                  value: 8, // 개수
                },
              ],
            },
            {
              type: '6', // 웹
              categories: [
                {
                  name: '테스트', // 종류
                  value: 30, // 개수
                },
                {
                  name: '기타', // 종류
                  value: 8, // 개수
                },
              ],
            },
          ],
        },
      },
    });
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
