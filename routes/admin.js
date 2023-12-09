const express = require('express');
const conn = require("../dbconn/dbconn");
const router = express.Router();

router.get('/', (req, res) => {
  if (req.session.loggedin) {
    conn.getUserList((result) => {
        conn.getTeamList((teams) => {
            console.log(result);
            res.render('admin', {
                data: {
                    window: result,
                    teams: teams
                },
            });
        });
    });
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
