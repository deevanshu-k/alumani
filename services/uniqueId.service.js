const alumani = require("../models");

async function generateUniqueId(adYear,branch) {
    let i = 1001;
    data = await alumani.findAll({
        attributes: ['uniqueId']
    });
    let arr = [1000];
    data.forEach(id => {
        let s = id.uniqueId;
        let m = s.substring(s.length - 4, s.length);
        arr.push(Number(m));
    });
    let max = Math.max(...arr);
    return (adYear + branch + (++max || i))
}

module.exports = {generateUniqueId};