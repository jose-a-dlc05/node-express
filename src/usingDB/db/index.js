import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});

export default {
	/**
	 * DB Query
	 * @param {object} text
	 * @param {object} params
	 * @returns Promise
	 */
	query(text, params) {
		return new Promise((resolve, reject) => {
			pool
				.query(text, params)
				.then((res) => {
					resolve(res);
				})
				.catch((err) => {
					reject(err);
				});
		});
	},
};

/**
 * query method takes in two arguments:
 * text - query text
 * params - values required by text
 *
 * These two arguments are what is needed to query the DB. The method returns a promise and we will
 * call it in our controller.
 */
