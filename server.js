const http = require('http');
const { Pool, Client } = require('pg')

const pool = new Pool()

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

pool.query('SELECT * FROM accounts', (err, res) => {
  if (err) {
    throw err
  }

  console.log('User:', res.rows[0].user_name)
})


const hostname = '0.0.0.0';
const port = 8000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
