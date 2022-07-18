const mysql = require('mysql2');

const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

// express middleware
app.use(express.urlencoded( { extended: false }));
app.use(express.json());

// connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        //your mysql username,
        user: 'root',
        // your mysql password
        password: 'Che$terC@t123',
        database: 'election'
    },
    console.log('Connected to the election database. ')
);

//test to see if the connection is workign with express
// app.get('/', (req, res) => {
//     res.json({
//         message: 'Hello World'
//     });
// });

// GET a single candidate
db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
    if (err) {
        console.log(err);
    }
    console.log(row)
});

// delete a candidate
// db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(result);
// });

// Create a candidate
const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
    VALUES (?,?,?,?)`;
const params = [1, 'Ronald', 'Firbank', 1];

db.query(sql, params, (err, result) => {
    if (err) {
        console.log(err);
    }
    console.log(result);
});

// db.query(`SELECT * FROM candidates`, (err, rows) => {
//     console.log(rows);
// });

// default response for any other request (not found)
app.use((req, res) => {
    res.status(404).end();
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});