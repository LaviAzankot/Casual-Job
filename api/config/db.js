import pg from "pg";

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "#",
    password: "#",
    port: 5432 
});

export default db;
