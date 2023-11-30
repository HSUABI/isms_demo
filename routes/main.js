const express = require('express');
const path = require('path'); // path 모듈 추가
const router = express.Router();

router.get('/', (req, res) => {
  if (req.session.loggedin) {
    res.sendFile(path.join(__dirname, '..', 'views', 'main.html'));
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
