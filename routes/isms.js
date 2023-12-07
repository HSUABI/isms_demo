const express = require("express");
const conn = require("../dbconn/dbconn");

const router = express.Router();

router.get("/:type", (req, res) => {
    conn.getSystemData("S01", (result) => {
        conn.getSystemList((systemList) => {
            if (req.session.loggedin) {
                console.log(req);
                res.render("isms", {
                    // 랜더링 데이터
                    data: {
                        navbar: {
                            active: "isms",
                        },
                        systems: systemList,
                        // 웹 브라우저의 window.data 객체 안에 저장되는 값
                        window: result,
                    },
                    params: req.params,
                });
            } else {
                res.redirect("/login");
            }
        });
    });
});

module.exports = router;
