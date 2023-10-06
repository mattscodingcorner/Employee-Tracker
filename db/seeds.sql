INSERT INTO department (id, name) VALUES
(1, 'Sales'),
(2, 'Marketing'),
(3, 'Engineering'),
(4, 'Human Resources'),
(5, 'Finance');

INSERT INTO role (id, title, salary, department_id) VALUES
(1, 'Sales Manager', 100000, 1),
(2, 'Sales Representative', 80000, 1),
(3, 'Marketing Manager', 100000, 2),
(4, 'Marketing Representative', 80000, 2),
(5, 'Engineering Manager', 100000, 3),
(6, 'Engineer', 80000, 3),
(7, 'Human Resources Manager', 100000, 4),
(8, 'Human Resources Representative', 80000, 4),
(9, 'Finance Manager', 100000, 5),
(10, 'Finance Representative', 80000, 5);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES
(1, 'John', 'Smith', 1, NULL),
(2, 'Jane', 'Doe', 2, 1),
(3, 'Bill', 'Jones', 3, NULL),
(4, 'Mary', 'Johnson', 4, 3),
(5, 'Tom', 'Brown', 5, NULL),
(6, 'Susan', 'Williams', 6, 5),
(7, 'David', 'Walker', 7, NULL),
(8, 'Michael', 'Johnson', 8, 7),
(9, 'Sarah', 'Miller', 9, NULL),
(10, 'Mark', 'Taylor', 10, 9);

--reused seeds from previous repo