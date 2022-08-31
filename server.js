const inquirer = require('inquirer');
const mysql = require('mysql2');




//Connect to database

const db = mysql.createConnection(
   {
    host:'localhost',
      user:'root',
       password: '7141',
    database: 'employee_db'
    }
    
);
db.connect(function(err){
 if(err) throw err;
   

    console.log("Connected to employee_db database.");
    viewPrompt();
})

// Main prompt for user to select
function viewPrompt () {
  
    return inquirer.prompt([
      {
        type: 'list',
        name: 'main',
        message: 'What would you like to do?',
        choices:[ 'View all employees','View All Roles', 'View All Departments', 'Update Employee Role', 'Add Employee', 'Add Role', 'Add Department', 'Delete Employee', 'delete role']
      },

    ])
    .then (function(res){
        switch(res.main){
          //if user selects to view all employees
            case 'View all employees':
                viewAllEm();
                break;
          //if user selects to view all roles
            case 'View All Roles':
              viewRole();
              break;
          //if user selects to view all departments
            case 'View All Departments':
              viewDep();
              break;
          //add department
            case 'Add Department':
              addDepartment();
              break;
          //add role
            case 'Add Role':
              addRole();
              break;
          //add employee
            case 'Add Employee':
              addEmployee();
            break;
          //Update employee role
          case 'Update Employee Role':
            updateEmployeeRole();
            break;
          //delete employee
            case 'Delete Employee':
              deleteEmployee();
              break;
            case 'delete role':
              deleteRole()
              break;
        }
    })
  };
//View All Employee function 
  function viewAllEm () {
    const sql = `SELECT e.id, e.first_name AS 'First Name', e.last_name AS 'Last Name', r.job_title AS 'Title', r.salary, d.department_name AS 'Department', m.last_name AS 'Manager Name'
                FROM employee e
                LEFT JOIN employee m
                ON e.manager_id = m.id
                LEFT JOIN roles AS r
                ON e.role_id = r.id
                LEFT JOIN departments AS d
                ON r.department_id = d.id
                ORDER BY e.last_name;`;
    db.query(sql, (err, result) => {
        if(err){
            console.log(err);
        }
        console.table(result);
        viewPrompt();
    })
  };

  // View roles function
  function viewRole() {
    const sql = `SELECT * FROM roles`;

    db.query(sql, (err, result) => {
      if(err) {
        console.log(err);
      }
      console.table(result);
      viewPrompt();
    })
  };

  // View all departments function 
  function viewDep () {
    const sql = `SELECT * FROM departments`;

    db.query(sql, (err, result) => {
      if(err) {
        console.log(err);
      }
      console.table(result);
      viewPrompt();
    })
  };
  //Add department function
  function addDepartment () {
    return inquirer.prompt([
      {
        type: 'input',
        name: 'department',
        message: 'What is the name of the department?'
      }
    ])
    .then(function(answer){
      const sql = `INSERT INTO departments(department_name) VALUES (?)`;
      const params = [answer.department];
      db.query(sql, params, (err, result) => {
        if(err) {
          console.log(err);
        }
        viewDep();
        viewPrompt();      

      })

    })
  };

//Add role function
function addRole () {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the job title?'
    },
    {
      type: 'input',
      name: 'salary',
      message: 'What is the salary for this role?'
    },
    {
      type: 'input',
      name: 'department',
      message: 'What is the department ID?'
    }

  ])
  .then(function(res){
    const sql = `INSERT INTO roles (job_title, salary, department_id)
                VALUES (?, ?, ?)`;
    const params = [res.title, res.salary, res.department];
    db.query(sql, params, (err, result) => {
      if(err) {
        console.log(err);
      }
      viewRole();
      viewPrompt();      

    })

  })
};

//add employee function
function addEmployee() {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: 'Enter employee first name:'
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'Enter employee last name:'
    },
    {
      type: 'input',
      name: 'roleId',
      message: 'What is the role ID?'
    },
    {
      type: 'input',
      name: 'managerId',
      message: 'What is the manager ID?'
    }

  ])
  .then(function(res) {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                VALUES (?, ?, ?, ?)`;
    const params = [res.firstName, res.lastName, res.roleId, res.managerId];
      db.query(sql, params, (err, result) => {
        if(err) {
          console.log(err);
        }
          viewAllEm();
          viewPrompt();      
    })
  })
};

//update employee role
function updateEmployeeRole() {
  return inquirer.prompt([
    {
      type:'input',
      name:'employeeId',
      message: 'Please enter the employee ID:'
    },
    {
      type:'input',
      name:'newRole',
      message: 'Please enter the new role ID:'
    },
    {
      type:'input',
      name:'newManager',
      message: 'Please enter the new manager ID:'
    }
  ])
  .then(function(res) {
    const sql = `UPDATE employee
                 SET 
                 role_id = ?,
                 manager_id = ?
                WHERE id = ?`;
    const params = [res.newRole, res.newManager, res.employeeId];
    db.query(sql, params, (err, result) => {
      if(err) {
        console.log(err);
      }
        viewAllEm();
        viewPrompt();      
  })
  })
}

//delete employee function
function deleteEmployee () {
  
  return inquirer.prompt([
    {
      type: 'input',
      name: 'id',
      message:'Please enter the employee id:'
    }
  ])
    .then(function(res){
      const sql = `DELETE FROM employee WHERE id = ?`;
      const params =[res.id];
      db.query(sql, params, (err, result) => {
        if(err) {
          console.log(err);
        }
        viewAllEm();
        
      })

    })
 };
 function deleteRole () {
  
  return inquirer.prompt([
    {
      type: 'input',
      name: 'id',
      message:'Please enter the role id:'
    }
  ])
    .then(function(res){
      const sql = `DELETE FROM roles WHERE id = ?`;
      const params =[res.id];
      db.query(sql, params, (err, result) => {
        if(err) {
          console.log(err);
        }
        viewRole();
        viewPrompt();
        
      })

    })
 };





