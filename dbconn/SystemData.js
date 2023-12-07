const db = require("../db");

function packData(results) {
    let data;
    let titleData;
    data = [];
    titleData = null;
    results.forEach((element) => {
        // is title
        if (element.class3 == null) {
            if (titleData != null) {
                data.push(titleData);
            }
            titleData = {};
            titleData.name = element.title;
            titleData.score = [element.score1, element.score2, element.score3];
            titleData.subs = [];
        } else {
            titleData.subs.push({
                name: element.title,
                grade: element.grade,
            });
        }
    });
    return data;
}

module.exports = async (systemId, callback) => {
    return db.query(
        "SELECT class1, class2, class3, title, " +
        "score1, score2, score3, grade FROM isms " +
        "WHERE system_id=?",
        [systemId],
        (err, results) => {
            let pack1 = [];
            let pack2 = [];
            let pack3 = [];

            results.forEach((element) => {
                switch (element.class1) {
                    case 1:
                        pack1.push(element);
                        break;
                    case 2:
                        pack2.push(element);
                        break;
                    case 3:
                        pack3.push(element);
                        break;
                    default:
                        break;
                }
            });
            let data = {
                statistics: [
                    {
                        type: "1", // 1. 관리체계 수립 및 운영
                        categories: packData(pack1),
                    },
                    {
                        type: "2", // 2. 보호대책 요구사항
                        categories: packData(pack2),
                    },
                    {
                        type: "3", // 3. 개인정보 처리 단계별 요구사항
                        categories: packData(pack3),
                    },
                ],
            };
            console.log(data);
            callback(data);
        }
    );
};
