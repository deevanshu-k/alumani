const alumani = require('./alumaniData');

alumani.sync({force:false}).then(async () => {
    console.log('Alumani table created!');
    a = await alumani.findAll();
    console.log(a);
}).catch((error) => {
    console.log(error);
})

module.exports = alumani;