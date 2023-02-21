const mysql = require('mysql2');
const inquirer = require('inquirer')
const GlobalConstants = require('./Global_Constants.js')

// Employee Tracker
class EmployeeTracker {
    constructor()
    {
        // Connect to database
        this.db = mysql.createConnection(
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
    }

    // **************************
    // Start application
    // **************************

    startApp() {
        // prompt the main user questions
        this.mainPrompt()
    }

    // **************************
    // Main Prompt
    // **************************

    mainPrompt(){
        console.log('prompting')
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
        inquirer.prompt(question)
        // prcess the next state
        .then((response) => {
            // go to next state
            this.processNext(response.main_menu)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    processNext(selected) {
        switch(selected){
            case 'View All Employees':
                this.getEmployees();
                break;
            case 'Add Employee':
                this.setEmployee();
                break;
            case 'Update Employee Role':
                this.updateEmployee();
                break;
            case 'View All Roles':
                this.getRoles();
                break;
            case 'Add Role':
                this.setRole()
                break;
            case 'View All Departments':
                this.getDepartments()
                break;
            case 'Add Department':
                this.setDepartment()
                break;
            case 'Quit':
                process.exit()
                break;
        }
        // reprompt user
        this.mainPrompt()
    }
    


    // **************************
    // Getter Functions
    // **************************
    
    // query all employees
    getEmployees() {
        // query the employees
        this.db.query(GlobalConstants.GET_EMPLOYEES,function (err, results) {
                console.table(results);
            });
    }

    // query all roles
    getRoles() {
        console.log('getting all roles')
    }
    
    // query all departments
    getDepartments() {
        console.log('getting all departments')
    }

    // **************************
    // Setter Functions
    // **************************
    
    // set all employee
    setEmployee() {
        console.log('setting employee')
    }

    // update an employee
    updateEmployee() {
        console.log('Updating Employee')
    }
    
    // add new role
    setRole() {
        console.log('Adding new role')
    }

    // add new department
    setDepartment() {
        console.log('Adding new department')
    }
    

}

module.exports = EmployeeTracker;