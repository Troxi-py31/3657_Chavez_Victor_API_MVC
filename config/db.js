const sql = require('mssql/msnodesqlv8');
require('dotenv').config();

const server = process.env.DB_SERVER || 'localhost\\SQLEXPRESS';
const database = process.env.DB_DATABASE || 'chavezcars_db';

const dbConfig = {
  connectionString: `Driver={ODBC Driver 17 for SQL Server};Server=${server};Database=${database};Trusted_Connection=yes;TrustServerCertificate=yes;`
};

const poolPromise = new sql.ConnectionPool(dbConfig)
  .connect()
  .then(pool => {
    console.log('Conectado exitosamente a SQL Server Express (chavezcars_db)');
    return pool;
  })
  .catch(err => {
    console.error('Error al conectar con SQL Server:', err.message);
    throw err;
  });

module.exports = { sql, poolPromise };