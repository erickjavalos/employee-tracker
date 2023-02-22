const inquirer = require('inquirer');
const mysql = require('mysql2');
const GlobalConstants = require('./lib/Global_Constants.js')

// // ************************************************
// // DB handling 
// // ************************************************
const db = mysql.createConnection(
    {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password
    password: 'password',
    database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
);


// **************************
// Getter Functions
// **************************

// query all employees
function getEmployees() {
    // query the employees
    db.query(GlobalConstants.GET_EMPLOYEES,function (err, results) {
        console.table(results);
        start()
    });
    
}

 // query all roles
function getRoles() {
    db.query(GlobalConstants.GET_ROLES,function (err, results) {
        console.table(results);
        start()
    });
}

// query all departments
function getDepartments() {
    db.query(GlobalConstants.GET_DEPARTMENTS,function (err, results) {
        console.table(results);
        start()
    });
}

// **************************
// Setter Functions
// **************************

// set all employee
function setEmployee() {
    db.query(GlobalConstants.GET_ROLES, function (err, results) {
        let role_names = []
        let role_keys = []
        // get roles
        results.forEach((val) => {
            role_names.push(val.title)
            role_keys.push(val.id)
        })
        db.query(GlobalConstants.GET_EMPLOYEES, function(err, results) {
            let employee_names = []
            let employee_keys = []
            // get employee names and keys
            results.forEach((val) => {
                employee_names.push(val.first_name + " " + val.last_name)
                employee_keys.push(val.id)
            })
            const questions = [
                {
                    type: 'input',
                    name: 'first_name',
                    message: "What is the employee's first name?",
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: "What is the employee's last name?",
                },
                {
                    name: 'role',
                    type: "list",
                    message: "What is the employee' role?",
                    choices: role_names,
                },
                {
                    name: 'manager',
                    type: "list",
                    message: "Who is the employee's manager?",
                    choices: employee_names,
                }
            ]
            // prompt question
            inquirer.prompt(questions)
            .then((response)=>{
                // find index of response.department
                let index_role = 0;
                let index_man = 0;
                
                for (let i = 0; i < role_names.length; i++)
                {
                    if (role_names[i] === response.role)
                    {
                        break;
                    }
                    index_role += 1;
                }
                console.log(role_names[index_role])

                for (let i =0; i < employee_names.length; i++)
                {
                    if (employee_names[i] === response.manager)
                    {
                        break;
                    }
                    index_man++;
                }

                let role_id = role_keys[index_role]
                // retreive manager id 
                let manager_id = employee_keys[index_man]
                // // create query string
                let queryParam = ` ('${response.first_name}', '${response.last_name}' , ${role_id}, ${manager_id})`
                // console.log(GlobalConstants.INSERT_EMPLOYEE + queryParam)
                // // add role to database 
                db.query(GlobalConstants.INSERT_EMPLOYEE+queryParam,function (err, results) {
                    console.log(`Added ${response.first_name} ${response.last_name} to database`)
                    start()
                })
            })
        })
    })
        
}

// update an employee
function updateEmployee() {
    console.log('Updating Employee')
    start()
}

// add new role
function setRole() {
    // poll the departments
    db.query(GlobalConstants.GET_DEPARTMENTS, function (err, results) {
        let department_names = []
        let department_keys = []
        // get departments
        results.forEach((val) => {
            department_names.push(val.name)
            department_keys.push(val.id)
        })
        // results.forEach((val) => department_names.push({key: val.id,value: val.name}))
        const questions = [
            {
                type: 'input',
                name: 'name',
                message: "What is the name of the role?",
            },
            {
                type: 'input',
                name: 'salary',
                message: "What is the salary of the role?",
            },
            {
                name: 'department',
                type: "list",
                message: 'Which department does the role belong to?',
                choices: department_names,
            }
        ]
        // prompt question
        inquirer.prompt(questions)
        .then((response)=>{

            // find index of response.department
            let index = 0;
            department_names.forEach((val) => {
                if (val === response.department){
                    index++;
                    return;
                }
            })
            // retrieve department id 
            let department_id = department_keys[index]
            // create query string
            let queryParam = `('${response.name}', ${response.salary}, ${department_id})`
            // add role to database 
            db.query(GlobalConstants.INSERT_ROLES+queryParam,function (err, results) {
                console.log(`Added ${response.department} to database`)
                start()
            })
        })
    })
}

// add new department
function setDepartment() {
    console.log('Adding new department')
    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: "What is the name of the department?",
        }
    ]).then((response)=> {

        const queryParam = ` ('${response.department}');`
        db.query(GlobalConstants.INSERT_DEPARTMENTS+queryParam,function (err, results) {
            console.log(`Added ${response.department} to departments`)
            start()
        })

    })
}





async function start() {
    const question = [
        // team manager
        {
            name: 'main_menu',
            type: "list",
            message: 'What would you like to do?',
            choices: ['View All Employees', 'Add Employee', 'Update Employee Role',
                        'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit'],
        }
    ]
    // prompt the question
    let selection = await inquirer.prompt(question)
    // switch case based on prompted question
    switch(selection.main_menu){
        case 'View All Employees':
            await getEmployees();
            break;
        case 'Add Employee':
            return setEmployee();
            break;
        case 'Update Employee Role':
            return updateEmployee();
            break;
        case 'View All Roles':
            return getRoles();
            break;
        case 'Add Role':
            return setRole()
            break;
        case 'View All Departments':
            return getDepartments()
            break;
        case 'Add Department':
            return setDepartment()
            break;
        case 'Quit':
            process.exit();
    }
}




start()