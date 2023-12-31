const db = require("../db");

module.exports = async (callback) => {
    return db.query(
        "SELECT system_id, system_name " +
        "FROM systemlist",
        [],
        (err, results) => {
            let data = [];
            results.forEach((element) => {
                data.push({
                    id: element.system_id,
                    name: element.system_name
                });
            });
            callback(data);
        }
    );
};
