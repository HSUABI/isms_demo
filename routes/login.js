const express = require("express");
const db = require("../db");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("login", {
        // 랜더링 데이터
        data: {},
    });
});

router.post("/", (req, res) => {
    const id = req.body.id;
    const password = req.body.pw;

    db.query(
        "SELECT * FROM user " +
            "JOIN team ON user.team_id=team.team_id " +
            "WHERE user.user_id=? AND user.password=?",
        [id, password],
        (err, results) => {
            if (err) throw err;
            if (results.length > 0) {
                if (results[0].is_confirmed != 1) {
                    req.session.alert = "승인되지 않은 계정입니다!";
                    res.redirect("/login");
                    return;
                }
                req.session.loggedin = true; // 세션에 로그인 상태 저장
                req.session.username = id;
                req.session.user = {
                    id: id,
                    name: results[0].user_name,
                    team: {
                        id: results[0].team_id,
                        name: results[0].team_name,
                    },
                    is_admin: results[0].is_admin
                };
                res.redirect("/");
            } else {
                req.session.alert = "로그인에 실패하였습니다.";
                res.redirect("/login");
                return;
            }
        }
    );
});

module.exports = router;
