CREATE TABLE departments (
    department_name VARCHAR (30) NOT NULL,
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL
);

CREATE TABLE roles (
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    job_title VARCHAR (30) NOT NULL,
    department_id INTEGER (10) NOT NULL,
    salary DECIMAL (10,2) NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE employee (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR (30) NOT NULL,
    last_name VARCHAR (30) NOT NULL,
    role_id INTEGER (10) NOT NULL,
    manager_id INTEGER(10),
    FOREIGN KEY (role_id) REFERENCES roles(id)
);
    

