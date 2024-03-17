// ./database/db-connector.js

// // Get an instance of mysql we can use in the app
// var mysql = require('mysql')

// // Create a 'connection pool' using the provided credentials
// var pool = mysql.createPool({
//     connectionLimit : 10,
//     host            : 'classmysql.engr.oregonstate.edu',
//     user            : 'cs340_trane2',
//     password        : '2252',
//     database        : 'cs340_trane2'
// })

// // Export it for use in our applicaiton
// module.exports.pool = pool;




// Get an instance of mysql we can use in the app
var mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_brooksdy',
    password        : '3704',
    database        : 'cs340_brooksdy'
})

// Export it for use in our application
module.exports.pool = pool;