import mysql from 'mysql-await';
import {config} from 'dotenv';

config();

const pool = mysql.createPool({
  connectionLimit : process.env.CONNECTIONLIMIT,
  host            : process.env.HOST,
  user            : process.env.USER,
  password        : process.env.PASSWORD,
  database        : process.env.DATABASE
});

const connection = await pool.awaitGetConnection();

connection.on(`error`, (err) => {
  console.error(`Connection error ${err.code}`);
});

connection.release();
 
export default connection