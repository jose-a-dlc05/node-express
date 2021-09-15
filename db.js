/*
  Import Pool object from pg. Check pg documentation to read more on pooling. We use this to connect to our PostgreSQL Db. Pool is the easiest and common way of using pg. You can also make use of their Client API to connect to the DB.
*/
const { Pool } = require('pg');
/**
 * Import dotenv from dotenv and load it using dotenv.config() - what this does is to search for
 * env file in our project and load its content into the system environment so we can use node
 * process.env to access those variables.
 */
const dotenv = require('dotenv');

dotenv.config();

/**
 * We create a new instance of Pool and pass in connectionString to its constructor.
 * We use process.env.DATABASE_URL to get DATABASE_URL variable from the system environment.
 */

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});

/**
 * We listened to pool connect event and console log connected to the db
 */
pool.on('connect', () => {
	console.log('connected to the db');
});

/**
 * We set up a createTables() function, inside the function is a query that creates reflections
 * table with the following fields; id - UUID datatype, success - TEXT datatype, low_point - TEXT
 * datatype, take_away - TEXT datatype, created_date - TIMESTAMP datatype and modified_date -
 * datatype.
 */

/**
 * Create Tables
 */
const createTables = () => {
	const queryText = `CREATE TABLE IF NOT EXISTS
      reflections(
        id UUID PRIMARY KEY,
        success VARCHAR(128) NOT NULL,
        low_point VARCHAR(128) NOT NULL,
        take_away VARCHAR(128) NOT NULL,
        created_date TIMESTAMP,
        modified_date TIMESTAMP
      )`;

	/**
	 * We call pool query method with queryText as an argument and it returns a promised. We called
	 * pool.end() to close pool connection to the db.
	 */
	pool
		.query(queryText)
		.then((res) => {
			console.log(res);
			pool.end();
		})
		.catch((err) => {
			console.log(err);
			pool.end();
		});
};

/**
 * We created another function called dropTables() - What this does it to delete reflection table
 * We set up a new query DROP TABLE IF EXISTS reflections that drop reflections table if it exists
 * in the DB.
 */

/**
 * Drop Tables
 */
const dropTables = () => {
	const queryText = 'DROP TABLE IF EXISTS reflections';
	pool
		.query(queryText)
		.then((res) => {
			console.log(res);
			pool.end();
		})
		.catch((err) => {
			console.log(err);
			pool.end();
		});
};
/**
 * We use pool.on('remove') to listened to pool remove event and use process.exit(0) to exit the
 * node process.
 */
pool.on('remove', () => {
	console.log('client removed');
	process.exit(0);
});

module.exports = {
	createTables,
	dropTables,
};

/*
Lastly, we require make-runnable package - We need this to be able to call and any of our two functions from the terminal. Note: You have to require make-runnable at the end. Also, don't forget to install make-runnable as project dev-dependency.
You'll also notice that we used require instead of import, this is because we only want to run db.js file from the terminal alone and it is not directly part of our project so there is no point in compiling it.
*/
require('make-runnable');
