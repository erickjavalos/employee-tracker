const inquirer = require('inquirer');
const EmployeeTracker = require('./lib/EmployeeTracker')

// initialize employee tracker library
let employeeTracker = new EmployeeTracker()
// start the application
employeeTracker.startApp()