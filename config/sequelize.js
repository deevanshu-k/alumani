require('dotenv').config();
const {Sequelize} = require("sequelize");
let sequelize;

console.log("ENVIRONMENT : "+process.env.NODE_ENV);
if(process.env.NODE_ENV == 'production'){
   sequelize = new Sequelize(
      process.env.db_name,
      process.env.db_username,
      process.env.db_password,
       {
         host: process.env.db_host,
         dialect: process.env.db_dialect
       }
     );
}else {
   sequelize = new Sequelize(process.env.DATABASE_URL,{
      dialect: 'postgres',
      dialectOptions: {
          ssl: true
      }
   });
}
  
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });

  module.exports = sequelize;