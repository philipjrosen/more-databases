/* You'll need to 
 * npm install sequelize
 * before running this example. Documentation is at http://sequelizejs.com/ 
 */

var Sequelize = require("sequelize");
var sequelize = new Sequelize("chat", "root");
/* TODO this constructor takes the database name, username, then password.
 * Modify the arguments if you need to */

/* first define the data structure by giving property names and datatypes
 * See http://sequelizejs.com for other datatypes you can use besides STRING. */
var message = sequelize.define('message', {
  id: { type: Sequelize.INT, primaryKey: true, autoIncrement: true},
  username: Sequelize.STRING,
  text: Sequelize.STRING,
  roomname: Sequelize.STRING
});

exports.message = message;