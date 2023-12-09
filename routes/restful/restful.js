const express = require("express");
const conn = require("../../dbconn/dbconn");
const db = require('../../db')

const router = express.Router();

router.get("/getISMS", (req, res) => {
    conn.getSystemData(req.query.systemID, req.query.year, (result) => {
        conn.getSystemList((systemList) => {
            if (req.session.loggedin) {
                res.send(result);
            } else {
                res.redirect("/login");
            }
        });
    });
});

router.get("/modify/user", (req, res) => {
    db.query(
        "UPDATE user SET user_name=?, affiliation=?, " +
        "team_id=?, is_confirmed=?, is_admin=?, ip=? " +
        "WHERE user_id=?",
        [req.query.name, req.query.affiliation, req.query.team,
            Number(req.query.approve), Number(req.query.admin), req.query.ip, req.query.id]
    )
});

router.get("/remove/user", (req, res) => {
    db.query(
        "DELETE FROM user WHERE user_id=?",
        [req.query.id]
    )
});

module.exports = router;
