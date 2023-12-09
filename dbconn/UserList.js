const db = require("../db");

module.exports = async (callback) => {
    return db.query(
        "SELECT user_id, user_name, affiliation, " +
        "team_name, team.team_id, is_confirmed, is_admin, ip " +
        "FROM user JOIN team ON user.team_id=team.team_id",
        [],
        (err, results) => {
            console.log(results);
            let data = [];
            results.forEach((element) => {
                data.push({
                    user_id: element.user_id,
                    user_name: element.user_name,
                    affiliation: element.affiliation,
                    ip: element.ip,
                    team_name: element.team_name,
                    team_id: element.team_id,
                    is_confirmed: element.is_confirmed==1,
                    is_admin: element.is_admin==1
                });
            });
            callback(data);
        }
    );
};
