var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');


// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

//Create connection
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Shsk0707",
    database: "employeesDB"
});

// Connect to mysql server and db
connection.connect(function (err) {
    if (err) throw err
    console.log("connected as id " + connection.threadId);
    start()
});

// Prompts the user what action they would like to take

function start() {
    inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "What would you like to do? ",
            choices: ["View All Employees", "View All Employees by Department", "View All Employees by Role", "Add Emplyee", "Add Department", "Add Role", "Update Employee Role", "EXIT"]

        }
    ]).then(function (res) {
        switch (res.action) {
            case "View All Employees":
                viewAllEmployee();
                break;
            case "View All Employees by Department":
                viewByDept();
                break;
            case "View All Employees by Role":
                veiwByRole();
                break;
            case "Add Add Emplyee":
                addEmployee();
                break;
            case "Add Department":
                addDept();
                break;
            case "Add Role":
                addRole();
                break;
            case "Update Employee Role":
                updateRole();
                break;
            case "EXIT":
                return;
        };
    });
};