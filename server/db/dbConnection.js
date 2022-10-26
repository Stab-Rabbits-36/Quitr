require('dotenv').config();
const { Pool } = require('pg');
const PG_URI =
  'postgres://nsjouiot:4nVVHLiARTADoIiwArtQLG-HfkhQR03k@peanut.db.elephantsql.com/nsjouiot';

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
