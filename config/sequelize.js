require('dotenv').config();
const {Sequelize} = require("sequelize");

const sequelize = new Sequelize(
   process.env.db_name,
   process.env.db_username,
   process.env.db_password,
    {
      host: process.env.db_host,
      dialect: process.env.db_dialect
    }
  );

  
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });

  module.exports = sequelize;