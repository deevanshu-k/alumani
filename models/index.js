const alumani = require('./alumaniData');
const data = require('../data.json');

alumani.sync({ force: true }).then(async () => {
    console.log('Alumani table created!');
    let idAr = [];
    data.forEach(e => {
        idAr.push(e.id);
        e.createdAt = "";
        e.updatedAt = new Date().toISOString();
        if(e.admissionyear == '') e.admissionyear = 1111;
        if(e.passoutyear == '') e.passoutyear = 1111;
    });
    let al = await alumani.findAll({
        where: {
            id: {in:idAr}
        }
    });
    if(!al[0]){
        let a = await alumani.bulkCreate(data);
    }
    console.log("Initial Data Added");
}).catch((error) => {
    console.log(error);
})

module.exports = alumani;