const inquirer = require("inquirer");
const mysql = require("mysql2");


const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "H{}QpZejNnWC%(oI0UQg",
    database: "employee_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected to Server");
    showPrompt();
});

//inquirer prompts

const showPrompt = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'mainMenu',
            message: 'What would you like to do?',
            choices: [
                'View All Employees',
                'Add Employee',
                'Update Employee Role',
                'View All Roles',
                'Add Role',
                'View All Departments',
                'Add Department',
                'View All Employees By Department',
                'Quit'
            ]
        }
    ]).then((answer) => {
        switch (answer.mainMenu) {
            case 'View All Employees':
                viewAllEmployees();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Update Employee Role':
                updateEmployeeRole();
                break;
            case 'View All Roles':
                viewAllRoles();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'View All Departments':
                viewAllDepartments();
                break;
            case 'Add Department':
                addDepartment();
                break;
            case 'View All Employees By Department':
                viewAllEmployeesByDepartment();
                break;    
                case 'Quit':
                    connection.end();
                    break;
        }
    })
};

const viewAllEmployees = () => {
    connection.query('SELECT * FROM employee', function (err, res) {
        if (err) throw err;
        console.table(res);
        showPrompt();
    })
};

const addEmployee = () => {
    connection.query('SELECT * FROM role', function (err, res) {
        if (err) throw err;
        connection.query('SELECT * FROM employee', function (err, res2) {
            if (err) throw err;
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: 'What is the first name of the employee?'
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: 'What is the last name of the employee?'
                },
                {
                    type: 'list',
                    name: 'role',
                    message: 'What is the role of the employee?',
                    choices: res.map(role => role.title)
                },
                {
                    type: 'list',
                    name: 'manager',
                    message: 'Who is the manager of the employee?',
                    choices: res2.map(manager => manager.first_name + ' ' + manager.last_name)
                }
            ]).then((answer) => {
                let roleID = res.find(role => role.title === answer.role).id;
                let managerID = res2.find(manager => manager.first_name + ' ' + manager.last_name === answer.manager).id;
                connection.query('INSERT INTO employee SET ?',
                    {
                        first_name: answer.firstName,
                        last_name: answer.lastName,
                        role_id: roleID,
                        manager_id: managerID
                    },
                    function (err, res) {
                        if (err) throw err;
                        console.log('Employee added!');
                        showPrompt();
                    })
            })
        })
    });
};

const updateEmployeeRole = () => {
    connection.query('SELECT * FROM role', function (err, res) {
        if (err) throw err;
        connection.query('SELECT * FROM employee', function (err, res2) {
            if (err) throw err;
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employee',
                    message: 'Which employee would you like to update?',
                    choices: res2.map(employee => employee.first_name + ' ' + employee.last_name)
                },
                {
                    type: 'list',
                    name: 'role',
                    message: 'What is the new role of the employee?',
                    choices: res.map(role => role.title)
                }
            ]).then((answer) => {
                let roleID = res.find(role => role.title === answer.role).id;
                let employeeID = res2.find(employee => employee.first_name + ' ' + employee.last_name === answer.employee).id;
                connection.query('UPDATE employee SET ? WHERE ?',
                    [
                        {
                            role_id: roleID
                        },
                        {
                            id: employeeID
                        }
                    ],
                    function (err, res) {
                        if (err) throw err;
                        console.log('Employee updated!');
                        showPrompt();
                    })
            })
        })  
    });
}

const viewAllRoles = () => {
    connection.query('SELECT * FROM role', function (err, res) {
        if (err) throw err;
        console.table(res);
        showPrompt();
    })
};
const addRole = () => {
    connection.query('SELECT * FROM department', function (err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
                type: 'input',
                name: 'role',
                message: 'What is the name of the role?'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of the role?'
            },
            {
                type: 'list',
                name: 'department',
                message: 'What is the department of the role?',
                choices: res.map(department => department.name)
            }
        ]).then((answer) => {
            let departmentID = res.find(department => department.name === answer.department).id;
            connection.query('INSERT INTO role SET ?',
                {
                    title: answer.role,
                    salary: answer.salary,
                    department_id: departmentID
                },
                function (err, res) {
                    if (err) throw err;
                    console.log('Role added!');
                    showPrompt();
                })
        })
    });
};
const viewAllDepartments = () => {
    connection.query('SELECT * FROM department', function (err, res) {
        if (err) throw err;
        console.table(res);
        showPrompt();
    })
};
const addDepartment = () => {
    connection.query('SELECT * FROM department', function (err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
                type: 'input',
                name: 'department',
                message: 'What is the name of the department?'
            }
        ]).then((answer) => {
            connection.query('INSERT INTO department SET ?',
                {
                    name: answer.department
                },
                function (err, res) {
                    if (err) throw err;
                    console.log('Department added!');
                    showPrompt();
                })
        })
    });
};
/* const viewAllEmployeesByDepartment = () => {
    connection.query('SELECT * FROM department', function (err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
                type: 'list',
                name: 'department',
                message: 'Which department would you like to view?',
                choices: res.map(department => department.name)
            }
        ]).then((answer) => {
            let departmentID = res.find(department => department.name === answer.department).id;
            connection.query('SELECT * FROM employee WHERE ?',
                {
                    department_id: departmentID
                },
                function (err, res) {
                    if (err) throw err;
                    console.table(res);
                    showPrompt();
                })
        })
    });
}; */