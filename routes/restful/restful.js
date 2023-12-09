const express = require("express");
const conn = require("../../dbconn/dbconn");

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

module.exports = router;
