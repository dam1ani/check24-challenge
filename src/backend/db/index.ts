import * as fs from 'fs';
import mysql from 'mysql2';

const { DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT, DB_CERT } = process.env;

const config: mysql.ConnectionOptions = {
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  port: Number(DB_PORT),
  ssl: {
    ca: fs.readFileSync(String(DB_CERT)).toString()
  }
};
// create the connection to database
let connection: mysql.Connection;

export const connect = () => {
  connection = mysql.createConnection(config);
}

export const firstFiveHotels = () => {
  connection.query(
    'SELECT * FROM `hotels` LIMIT 5;',
    function (err, results, fields) {
      console.log(err);
      console.log(results); // results contains rows returned by server
      console.log(fields); // fields contains extra meta data about results, if available
    }
  );
}