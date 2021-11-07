import express from 'express';
import routes from './controllers/index.js';
import { Sequelize } from 'sequelize';

const PORT = 4000;
const app = express();

app.use(routes);
app.use(express.static('public'));

var sequelize = new Sequelize('nodejs_homework_3', 'postgres', '', {
	host: 'localhost',
	dialect: 'postgres',
	port: 3000,
	pool: {
		max: 5,
		min: 0,
		idle: 10000,
	},
});

sequelize
	.authenticate()
	.then(() => {
		console.log('Connection has been established successfully.');
	})
	.catch((err) => {
		console.log('Unable to connect to the database', err);
	});

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
