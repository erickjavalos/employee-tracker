-- insert department names
INSERT INTO departments (name)
VALUES
    ("Legal"),
    ("Sales"),
    ("Engineering"),
    ("Finance");

INSERT INTO roles (title, salary, department_id)
VALUES
    -- add legal roles
    ("Legal Team Lead", 250000, 1),
    ("Lawyer", 190000, 1),
    -- add sales roles
    ("Sales Lead", 100000, 2),
    ("Salesperson", 80000, 2),
    -- add engineering roles
    ("Lead Engineer", 150000, 3),
    ("Software Engineer", 120000, 3),
    -- add finance
    ("Account Manager", 160000, 4),
    ("Accountant", 125000, 4);

-- load employees
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ("John", "Doe", 1, NULL),
    ("Mike", "Chan", 2, 1),
    ("Ashley", "Rodriguez", 3, NULL),
    ("Kevin", "Tupik", 4, 3),
    ("Kunal", "Singh", 5, NULL),
    ("Malia", "Brown", 6, 5),
    ("Sarah", "Lourd", 7, NULL),
    ("Tom", "Allen", 8, 7);