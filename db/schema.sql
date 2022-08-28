DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employee;
CREATE TABLE departments (
    department_name VARCHAR (30),
    department_id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL
);

CREATE TABLE roles (
    role_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    job_title VARCHAR (30),
    department_id INTEGER (10),
    salary DECIMAL (10,2) NOT NULL
    REFERENCES departments(id) ON DELETE SET NULL
);

CREATE TABLE employee (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR (30),
    last_name VARCHAR (30),
    role_id INTEGER (10),
    manager_id INTEGER(10)
    
);
    

