const Sequelize = require("sequelize");
require("dotenv").config(); 

//Creating a new object of type Sequelize and passing the required parameters.
const sequelize = new Sequelize("book-directory","root",`Johncena@123`,{
    dialect:"mysql",
    host:"localhost"
});

module.exports = sequelize;