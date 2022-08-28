const alumani = require('./alumaniData');

alumani.sync({force:false}).then(() => {
    console.log('Alumani table created!');
}).catch((error) => {
    console.log(error);
})

module.exports = alumani;