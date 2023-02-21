
consts = {
    GET_EMPLOYEES: "SELECT e.id, e.first_name, e.last_name, r.title, d.name AS departments, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employees e LEFT JOIN roles r ON e.role_id = r.id LEFT JOIN departments d ON d.id = r.department_id LEFT JOIN employees m ON m.id = e.manager_id;"

}
    

module.exports = consts;

