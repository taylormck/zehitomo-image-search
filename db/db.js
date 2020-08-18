/**
 * @file Access point for dealing with the db
 */

import knex from 'knex'
import knexfile from '../knexfile'

const env = process.env.NODE_ENV || 'development';
const configOptions = knexfile[env];

const db = knex(configOptions);

export default db
