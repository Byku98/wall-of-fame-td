import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  host: "192.168.1.125",
  port: 30306, 
  user: "leaderboard_user",
  password: "leaderboard_user",
  database: "pszczolki-wof-local",
  waitForConnections: true,
  connectionLimit: 10,
});