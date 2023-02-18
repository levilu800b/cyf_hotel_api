const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const db = new Pool ({
    user: 'LeviL',
    host: 'localhost',
    database: 'cyf_hotel',
    password: '',
    port: 5432
})

app.get('/', (req, res) => {
    res.send('<h1>Hotel Database Project Home Page</h1>')
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})