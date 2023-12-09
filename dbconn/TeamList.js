const db = require("../db");

module.exports = async (callback) => {
    return db.query(
        "SELECT team_id, team_name " +
        "FROM team",
        [],
        (err, results) => {
            let data = [];
            results.forEach((element) => {
                data.push({
                    id: element.team_id,
                    name: element.team_name
                });
            });
            callback(data);
        }
    );
};
