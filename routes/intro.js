const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  if (req.session.loggedin) {
    res.render('intro', {
      // 랜더링 데이터
      data: {
        navbar: {
          active: 'intro',
        },
      },
    });
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
