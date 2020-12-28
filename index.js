// Required modules
const connection = require("./connection");
const cTable = require('console.table');
const inquirer = require('inquirer');

// Connect to database and execute inquirer module
connection.connect((err) => {
    if (err) throw err;
    start();
});

// Prompts user for desired action
const start = () => {
    inquirer
        .prompt({
            name: "chooseAction",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View All Departments",
                "View All Roles",
                "View All Employees",
                "Add Department",
                "Add Role",
                "Add Employee",
                "Update Employee Role"]
        })
        .then(function (answer) {
            // Execute correct function based on user's answer
            if (answer.chooseAction === "View All Departments") {
                viewDepartments();
            }
            else if (answer.chooseAction === "View All Roles") {
                viewRoles();
            }
            else if (answer.chooseAction === "View All Employees") {
                viewEmployees();
            } else {
                connection.end();
            }
        });
}

// Query the database and return all employees for viewing
const viewEmployees = () => {
    connection.query('SELECT * FROM employee;', (err, results) => {
        if (err) throw err;
        // Display results of query in a table format
        console.table(results);
        // Return user to initial questions for further actions
        start();
    })
}