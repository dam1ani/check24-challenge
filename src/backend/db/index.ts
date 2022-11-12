import * as fs from 'fs';
import mysql from 'mysql2';
import { z } from 'zod';
import { hotelsBody } from '../schemas';

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

const convertDate = (date: Date) => date.toISOString().slice(0, 19).replace('T', ' ');

export const connect = () => {
  connection = mysql.createConnection(config);
}

export const countHotels = () => new Promise<number>((resolve, reject) =>
  connection.query<any[]>(
    'SELECT count(*) FROM `hotels`;',
    function (err, results) {
      if (err || !results[0] || !results[0]['count(*)']) {
        reject(err);
        return;
      }

      resolve(results[0]['count(*)']);
    }
  )
)

export const getMinPrice = () => new Promise<number>((resolve, reject) =>
  connection.query<any[]>(
    'SELECT min(price) FROM `cleanoffers`;',
    function (err, results) {
      if (err || !results[0] || !results[0]['min(price)']) {
        reject(err);
        return;
      }

      resolve(results[0]['min(price)']);
    }
  )
)


export const countOffers = () => new Promise<number>((resolve, reject) =>
  connection.query<any[]>(
    'SELECT max(id) FROM `cleanoffers`;',
    function (err, results) {
      const maxId = results?.[0]?.['max(id)'];
      if (err || !maxId) {
        reject(err);
        return;
      }

      resolve(maxId);
    }
  )
);

export const queryHotels = (query: z.infer<typeof hotelsBody>) => new Promise<any[]>((resolve, reject) => {
  const {adults, kids, from, to, days, airport, page} = query
  
  connection.query<any[]>(
    `select * 
    from Hotels a 
    inner join (
      select hotelid, min(price) as minhotprice 
      from cleanoffers 
      where countadults = ${adults} and countchildren = ${kids} 
        and departuredate >= '${convertDate(from)}' and returndate <= '${convertDate(to)}' 
        and inboundarrivalairport='${airport}' and days = '${days}'
      group by hotelid
    ) b on a.id= b.hotelid 
    order by minhotprice 
    limit 25 offset ${(page - 1) * 25};`,
    function (err, results) {

      if (err) {
        reject(err);
        return;
      }

      resolve(results);
    }
  )
});



export const queryOffers = (query: z.infer<typeof hotelsBody>, hotelid: number) => new Promise<any[]>((resolve, reject) => {
  const {adults, kids, from, to, days, airport, page} = query
  
  connection.query<any[]>(
    `select * 
    from cleanoffers 
    where countadults = ${adults} and countchildren = ${kids} 
      and departuredate >= '${convertDate(from)}' and returndate <= '${convertDate(to)}' 
      and inboundarrivalairport='${airport}' and days = '${days}'
      and hotelid = ${hotelid}
    order by price    
    limit 25 offset ${(page - 1) * 25};`,
    function (err, results) {

      if (err) {
        reject(err);
        return;
      }

      resolve(results);
    }
  )
});


//select * from Hotels a inner join (select hotelid, min(price) as minhotprice from CleanOffer group by hotelid) b on a.id= b.hotelid order by minhotprice limit 10;
