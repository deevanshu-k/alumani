const alumani = require('./alumaniData');

alumani.sync({force:true}).then(async () => {
    console.log('Alumani table created!');
    a = await alumani.findAll();
}).catch((error) => {
    console.log(error);
})

module.exports = alumani;