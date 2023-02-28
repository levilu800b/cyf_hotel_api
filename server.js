const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const db = new Pool({
	user: 'LeviL',
	host: 'localhost',
	database: 'cyf_hotel',
	password: '',
	port: 5432,
});

app.get('/', (req, res) => {
	res.send('<h1>Hotel Database Project Home Page</h1>');
});

// app.get('/customers', function (req, res) {
// 	db.query('SELECT id, name, city, phone FROM customers', (error, result) => {
// 		res.json(result.rows);
// 	});
// });

app.get('/customers', function (req, res) {
	db.query('SELECT * FROM customers', (error, result) => {
		res.status(200).json({ customers: result.rows });
	});
});

app.get('/customers/:customerId', function (req, res) {
	const customerId = req.params.customerId;
	db.query(
		'SELECT id, name, city, phone FROM customers WHERE id = $1',
		[customerId],
		(error, result) => {
			res.status(200).json({ customer: result.rows[0] });
		},
	);
});

app.get('/customers/by_city/:city', function (req, res) {
	const city = req.params.city;
	db.query(
		'SELECT id, name, city, phone FROM customers WHERE city = $1',
		[city],
		(error, result) => {
			res.status(200).json({ customers: result.rows });
		},
	);
});

app.post('/customers', function (req, res) {
	const newName = req.body.name;
	const newEmail = req.body.email;
	const newPhone = req.body.phone;
	const newAddress = req.body.address;
	const newCity = req.body.city;
	const newPostcode = req.body.postcode;
	const newCountry = req.body.country;

	const query =
		'INSERT INTO customers (name, email, phone, address, city, postcode, country) ' +
		'VALUES ($1, $2, $3, $4, $5, $6, $7)';
	db.query(
		query,
		[newName, newEmail, newPhone, newAddress, newCity, newPostcode, newCountry],
		(error, result) => {
			res.status(201).send('Customer created');
		},
	);
});

app.put('/customers/:customerId', function (req, res) {
	const customerId = req.params.customerId;
	const newName = req.body.name;
	const newEmail = req.body.email;
	const newPhone = req.body.phone;
	const newAddress = req.body.address;
	const newCity = req.body.city;
	const newPostcode = req.body.postcode;
	const newCountry = req.body.country;

	const query =
		'UPDATE customers SET name = $1, email = $2, phone = $3, address = $4, city = $5, postcode = $6, country = $7 ' +
		'WHERE id = $8';
	db.query(query, [
		newName,
		newEmail,
		newPhone,
		newAddress,
		newCity,
		newPostcode,
		newCountry,
		customerId,
	])
		.then(() => res.send(`Customer ${customerId} updated!`))
		.catch((error) => {
			console.error(error);
			res.status(500).json({ error: 'Something went wrong' });
		});
});

app.listen(3000, () => {
	console.log('Server is running on port 3000');
});
