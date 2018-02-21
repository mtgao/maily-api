const pg = require('pg');
const knex = require('knex');


const db = knex({
    client: 'pg',
    connection: 'postgresql://' +
                process.env.PGUSER +
                ':' + process.env.PGPASSWORD +
                '@' + process.env.PGHOST +
                ':5432/postgres',
    pool: {
        max: 5
    }
})
db.on('query-error', (err) => {
    throw err;
});
module.exports = db; 