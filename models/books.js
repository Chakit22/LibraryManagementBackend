const Sequelize = require("sequelize");
const sequelize = require("../src/database/connect_db");

//Schema for the Books table.
const Book = sequelize.define("book", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  author: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price:{
    type:Sequelize.INTEGER,
    allowNull:false
  }
});


module.exports = Book;