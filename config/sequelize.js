require('dotenv').config();
const {Sequelize} = require("sequelize");
let sequelize;

console.log("ENVIRONMENT : "+process.env.NODE_ENV);
if(process.env.NODE_ENV == 'production'){
   sequelize = new Sequelize(
      process.env.P_db_name,
      process.env.P_db_username,
      process.env.P_db_password,
       {
         host: process.env.P_db_host,
         dialect: process.env.P_db_dialect,
         logging: Number(process.env.P_db_logging) ? (d) => { console.log(d); } : false
       }
     );
}else {
   sequelize = new Sequelize(
      process.env.D_db_name,
      process.env.D_db_username,
      process.env.D_db_password,
       {
         host: process.env.D_db_host,
         dialect: process.env.D_db_dialect,
         logging: Number(process.env.D_db_logging) ? (d) => { console.log(d); } : false
       }
     );
}
  
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });

  module.exports = sequelize;