const db = require("./db/connection");
const {viewPrompt, viewAllEm, viewDep, viewRole, addDepartment, addEmployee, addRole, deleteEmployee, updateEmployeeRole, exit} = require('./functions/functions.js');




//Connect to database


db.connect(function(err){
 if(err) throw err;
   

    console.log("Connected to employee_db database.");
    viewPrompt();
})




 