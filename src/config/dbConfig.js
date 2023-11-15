const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host : 'localhost',
    port : '3306',
    user : 'admin_rafa',
    password : '2003',
    database : 'BD_LISTA_TAREAS',
    
});

module.exports = pool;                                                                                                                   