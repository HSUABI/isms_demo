const express = require("express");
const conn = require("../dbconn/dbconn");

const router = express.Router();

router.get("/:type", (req, res) => {
    conn.getSystemData("S01", (result) => {
        if (req.session.loggedin) {
            console.log(result);
            res.render("isms", {
                // 랜더링 데이터
                data: {
                    navbar: {
                        active: "isms",
                    },
                    systems: [
                        {
                            id: "S01",
                            name: "중앙대학교 전산시스템",
                        },
                        {
                            id: "S02",
                            name: "아주대학교 전산시스템",
                        },
                        {
                            id: "S03",
                            name: "공군사관학교 전산체계",
                        },
                    ],
                    // 웹 브라우저의 window.data 객체 안에 저장되는 값
                    window: result
                },
                params: req.params,
            });
        } else {
            res.redirect("/login");
        }
    });
});

module.exports = router;
