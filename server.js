const inquirer = require('inquirer');
const mysql = require('mysql2');


//Connect to database

const db = mysql.createConnection(
    {
        host:'localhost',
        port:'3001',
        user:'root',
        password: '7141',
        database: 'employee_db'
    }
    
);
db.connect(function(err){
    if(err) throw err;
   

    console.log("Connected to employee_db database.");
})

