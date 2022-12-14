INSERT INTO departments (department_name)
VALUES 
('Legal'),
('Finance'),
('Information Technology'),
('Retail');

INSERT INTO roles (job_title, salary, department_id)
VALUES
('Accountant', 52500.67, 2),
('Lawyer', 126200.86, 1),
('Developer', 85500.56, 3),
('Sale', 62530.86, 4),
('Developer Lead', 110233.56, 3),
('Sale Lead', 92530.86, 4),
('Lawyer Lead', 136200.86, 1),
('Accountant Lead', 72500.67, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Monte', 'Johnson', 5, NULL),
('Ryan', 'McDonald', 4, 1),
('Scott', 'Preston', 4, 1),
('Anne', 'Jackson', 4, 1),
('Robert', 'Dolan', 6, NULL),
('Jackie', 'Perez', 2, 5),
('Eric', 'Donald', 2, 5),
('Joe', 'Garland', 2, 5),
('May', 'Set', 7, NULL),
('Jaden', 'Gaveston',3, 9),
('Ashley', 'Butler',3, 9),
('Suzette', 'LeRoi',8, NULL),
('Sasan', 'Belle',1, 12),
('Edward', 'Woolf',1, 12);