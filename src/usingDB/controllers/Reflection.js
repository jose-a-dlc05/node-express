import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import db from '../db';

/**
 * create Reflection object with five methods - create(), getAll(), getOne(), update() and
 * delete(). We also make use of async/await
 */
const Reflection = {
	/**
	 * Create A Reflection
	 * @param {object} req
	 * @param {object} res
	 * @returns {object} reflection object
	 * create() - We imported our db from src/usingDB/db/index.js. For our SQL query, we used INSERT INTO reflections(list_columns_here..) VALUES($1, $2, $3, $4, $5, $6 ...) - what this does is create a new row in reflections table and insert the supplied values into its fields. values is an array of values that contains what we want to insert into the table. The elements inside values array must be in the same order as $1, $2, $3, $4, $5, $6. We used returning * to return the created row. Remembered we created query method that takes in two arguments text and params inside src/usingDB/db/index.js, this is where we will use it. We called the method and send in createQuery and values as parameters. Since db.query returns a promise we make use of async/await
	 */
	async create(req, res) {
		const text = `INSERT INTO
      reflections(id, success, low_point, take_away, created_date, modified_date)
      VALUES($1, $2, $3, $4, $5, $6)
      returning *`;
		const values = [
			uuidv4(),
			req.body.success,
			req.body.lowPoint,
			req.body.takeAway,
			moment(new Date()),
			moment(new Date()),
		];

		try {
			const { rows } = await db.query(text, values);
			return res.status(201).send(rows[0]);
		} catch (error) {
			return res.status(400).send(error);
		}
	},
	/**
	 * Get All Reflection
	 * @param {object} req
	 * @param {object} res
	 * @returns {object} reflections array
	 * set up SELECT * FROM reflections to get all rows in reflections table
	 */
	async getAll(req, res) {
		const findAllQuery = 'SELECT * FROM reflections';
		try {
			const { rows, rowCount } = await db.query(findAllQuery);
			return res.status(200).send({ rows, rowCount });
		} catch (error) {
			return res.status(400).send(error);
		}
	},
	/**
	 * Get A Reflection
	 * @param {object} req
	 * @param {object} res
	 * @returns {object} reflection object
	 *  use SELECT * FROM reflections WHERE id = $1 to retrieve a single row from reflections
	 * table where the id is the specified id
	 */
	async getOne(req, res) {
		const text = 'SELECT * FROM reflections WHERE id = $1';
		try {
			const { rows } = await db.query(text, [req.params.id]);
			if (!rows[0]) {
				return res.status(404).send({ message: 'reflection not found' });
			}
			return res.status(200).send(rows[0]);
		} catch (error) {
			return res.status(400).send(error);
		}
	},
	/**
	 * Update A Reflection
	 * @param {object} req
	 * @param {object} res
	 * @returns {object} updated reflection
	 * To update a reflection, we queried the DB twice - the first one is to get the specific row the
	 * user wants to update and the second DB query update the row based on new input from the user.
	 * We use UPDATE reflections SET success=$1,low_point=$2,take_away=$3,modified_date=$4 WHERE
	 * id=$5 returning * to update a specific row in the table
	 */
	async update(req, res) {
		const findOneQuery = 'SELECT * FROM reflections WHERE id=$1';
		const updateOneQuery = `UPDATE reflections
      SET success=$1,low_point=$2,take_away=$3,modified_date=$4
      WHERE id=$5 returning *`;
		try {
			const { rows } = await db.query(findOneQuery, [req.params.id]);
			if (!rows[0]) {
				return res.status(404).send({ message: 'reflection not found' });
			}
			const values = [
				req.body.success || rows[0].success,
				req.body.low_point || rows[0].low_point,
				req.body.take_away || rows[0].take_away,
				moment(new Date()),
				req.params.id,
			];
			const response = await db.query(updateOneQuery, values);
			return res.status(200).send(response.rows[0]);
		} catch (err) {
			return res.status(400).send(err);
		}
	},
	/**
	 * Delete A Reflection
	 * @param {object} req
	 * @param {object} res
	 * @returns {void} return statuc code 204
	 * use DELETE FROM reflections WHERE id=$1 returning * to delete a row in reflection table using
	 * the row id
	 */
	async delete(req, res) {
		const deleteQuery = 'DELETE FROM reflections WHERE id=$1 returning *';
		try {
			const { rows } = await db.query(deleteQuery, [req.params.id]);
			if (!rows[0]) {
				return res.status(404).send({ message: 'reflection not found' });
			}
			return res.status(204).send({ message: 'deleted' });
		} catch (error) {
			return res.status(400).send(error);
		}
	},
};

export default Reflection;
