import pg from "pg";

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "casualJob",
    password: "lavi8454",
    port: 5432 
});

export default db;