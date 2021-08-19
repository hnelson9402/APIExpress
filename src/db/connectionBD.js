import mysql from 'mysql';
import {config} from 'dotenv';

config();

let connection = mysql.createConnection({
  host     : process.env.HOST,
  user     : process.env.USER,
  password : process.env.PASSWORD,
  database : process.env.DATABASE
});
 
connection.connect((error) =>{
   if (error) throw error;
   //console.log("conectado");
});
 
// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });
 
export default connection