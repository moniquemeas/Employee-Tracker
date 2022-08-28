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
function viewPrompt () {
  
    return inquirer.prompt([
      {
        type: 'list',
        name: 'main',
        message: 'What would you like to do?',
        choices:[ 'View all employees', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department']
      },

    ])
    .then (function(res){
        switch(res.main){
            case 'View all employees':
                viewAllEm();
                break;
            case 'View All Roles':
              viewRole();
              break;
            case 'View All Departments':
              viewDep();
        }
    })
  };

  function viewAllEm () {
    const sql = `SELECT * FROM employee`;
    db.query(sql, (err, result) => {
        if(err){
            console.log(err);
        }
        console.table(result);
        viewPrompt();
    })
  };
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
  function viewDep () {
    const sql = `SELECT * FROM departments`;

    db.query(sql, (err, result) => {
      if(err) {
        console.log(err);
      }
      console.table(result);
      viewPrompt();
    })
  }




