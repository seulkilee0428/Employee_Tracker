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

// Prompts the user 

function start() {
    inquirer.prompt([
        {
            type: "list",
            name: "start",
            message: "What would you like to do? ",
            choices: ["View All Employees", "View All Employees by Department", "View All Employees by Role", "Add Employee", "Add Department", "Add Role", "Update Employee Role", "EXIT"]

        }
    ]).then(function (res) {
        switch (res.start) {
            case "View All Employees":
                viewAllEmployee();
                break;
            case "View All Employees by Department":
                viewByDept();
                break;
            case "View All Employees by Role":
                veiwByRole();
                break;
            case "Add Employee":
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
                quit();
        };
    });
};

function viewAllEmployee() {
    const queryString = `SELECT 
   employees.id, 
   employees.first_name,
   employees.last_name,
   roles.title,
   department.name,
   roles.salary,
   CONCAT(manager.first_name, ' ', manager.last_name) as manager  
   FROM employees
   LEFT JOIN roles
   ON employees.role_id = roles.id
   LEFT JOIN department
   ON roles.department_id = department.id
   LEFT JOIN employees manager
   ON manager.id = employees.manager_id;`

    connection.query(queryString, function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    })
}

function viewByDept() {
    connection.query("SELECT * FROM department;", function (err, res) {
        if (err) throw err;
        console.log(res)
        start();
    })
}

function veiwByRole() {
    connection.query("SELECT * FROM roles;", function (err, res) {
        if (err) throw err;
        console.log(res)
        start();
    })
}

function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "What is the first name of new employee? "
        },
        {
            type: "input",
            name: "lastName",
            message: "What is the last name of new employee?"
        },
        {
            type: "input",
            name: "newRoleID",
            message: "What is the role ID for the new employee?"
        }
    ]).then(function (answer) {
        connection.query("INSERT INTO employees SET ?",
            {
                first_name: answer.firstName,
                last_name: answer.lastName,
                role_id: answer.newRoleID

            },
            function (err) {
                if (err) throw err;
                console.log("Your new employee has been added!");
                start();
            }
        );

    });
}

function addDept() {
    inquirer.prompt([
        {
            type: "input",
            name: "addDept",
            message: "What is the name of the department you want to add?"
        }
    ]).then(function (answer) {
        connection.query("INSERT INTO department SET ?",
            {
                name: answer.addDept,
            },
            function (err) {
                if (err) throw err;
                console.log("Your new department has been added!");
                start();
            }
        );
    });
}

function addRole() {
    inquirer.prompt([
        {
            type: "input",
            name: "addTitle",
            message: "Which title of the role you want to add?"
        },
        {
            type: "input",
            name: "addSalary",
            message: "What is the salary of the new role? "
        },
        {
            type: "input",
            name: "deptID",
            message: "What is the department ID of the new role?"
        }
    ]).then(function (answer) {
        connection.query("INSERT INTO roles SET ? ",
            {
                title: answer.addTitle,
                salary: answer.addSalary,
                department_id: answer.deptID
            },
            function (err) {
                if (err) throw err;
                console.log("Your new role has been added! ")
                start();
            }
        );
    });
}

function updateRole() {
    inquirer.prompt([
        {
            type: "input",
            name: "updateLN",
            message: "What is the last name of the employee?"
        },
        {
            type: "number",
            default: 0,
            name: "newRole",
            message: "what is the new role id for the employee?"
        }
    ]).then(function (answer) {
        const getEmLN = answer.updateLN
        const changeEmpRole = answer.newRole
        connection.query("UPDATE employees SET? WHERE? ",
            [
                {
                    role_id: changeEmpRole
                },
                {
                    last_name: getEmLN
                }
            ],
            function (err) {
                if (err) throw err
                console.log("Emplyees new role has been updated!")
                start();
            }
        )

    })
}

function quit() {
    console.log("Goodbye!");
    process.exit();
};

start();