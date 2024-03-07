/*
    Citation for the following code:
    Date: 2/28/24
    Adapted from the amazing work that has gone into the starter app resource
    Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/
*/

/*
    SETUP
*/

// Express
var express = require('express');
var app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
PORT = 9124;

// Database
var db = require('./database/db-connector');

// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');    
app.engine('.hbs', engine({extname: ".hbs"})); 
app.set('view engine', '.hbs');                



/*
    HOME ROUTE
*/
app.get('/', function(req, res) {
    return res.render('index');
});



/*
    EMPLOYEES ROUTES
*/
app.get('/employees', function(req, res) {
    let query1;
    if (req.query.employeeNametagSearch === undefined) {
        query1 = "SELECT * FROM employees;";
    } else {
        console.log(req.query.employeeNametagSearch)
        query1 = `SELECT * FROM employees WHERE employee_nametag LIKE "${req.query.employeeNametagSearch}%"`;
    }

    db.pool.query(query1, function(error, rows, fields){
        let employees = rows;
        return res.render('employees', {data: employees});
    })
});

app.post('/add-employee-ajax', function(req, res) {
    let data = req.body;

    let employee_nametag = data.employee_nametag;
    if (employee_nametag == "") {
        employee_nametag = 'NULL';
    }

    let employee_phone = parseInt(data.employee_phone);
    if (isNaN(employee_phone)) {
        employee_phone = 'NULL';
    }

    let query1 = `INSERT INTO employees (employee_nametag, employee_phone) VALUES ('${employee_nametag}', '${employee_phone}')`;
    db.pool.query(query1, function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            let query2 = `SELECT * FROM employees;`;
            db.pool.query(query2, function(error, rows, fields){
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            });
        }
    });
});

app.delete('/delete-employee-ajax', function(req, res, next) {
    let data = req.body;
    let employeeID = parseInt(data.employee_id);
    console.log(employeeID)
    let deleteEmployeeQuery = `DELETE FROM employees WHERE employee_id = ?`;

    db.pool.query(deleteEmployeeQuery, [employeeID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    });
});

app.put('/update-employee-ajax', function(req, res, next) {
    let data = req.body;
  
    let employeeID = data.employee_id;
    let employeePhone = data.employee_phone;
  
    let queryUpdateWorld = `UPDATE employees SET employee_phone = ? WHERE employees.employee_id = ?`;
    let selectWorld = `SELECT * FROM employees WHERE employee_id = ?`
  
    db.pool.query(queryUpdateWorld, [employeePhone, employeeID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            db.pool.query(selectWorld, [employeeID], function(error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
        }
    });
});





/*
    EMPLOYEES ROUTES
*/
app.get('/locations', function(req, res) {  
    let query1 = "SELECT * FROM locations;";              
    db.pool.query(query1, function(error, rows, fields){  
        res.render('locations', {data: rows});                
    })                                                    
});

app.post('/add-location-ajax', function(req, res) {
    let data = req.body;

    let sitePhone = parseInt(data.sitePhone);
    if (isNaN(sitePhone)) {
        sitePhone = 'NULL'
    }

    let wares = parseInt(data.wares);
    if (isNaN(wares)) {
        wares = 'NULL'
    }

    let postal = parseInt(data.postal);
    if (isNaN(postal)) {
        postal = 'NULL'
    }

    query1 = `INSERT INTO locations (wares_capacity, address_line, city, postal_code, site_phone) VALUES (${wares}, '${data.address}', '${data.city}', ${postal}, ${sitePhone});`;
    db.pool.query(query1, function(error, rows, fields){
        if (error) {
            console.log(error)
            res.sendStatus(400);

        } else {
            query2 = `SELECT * FROM locations;`;
            db.pool.query(query2, function(error, rows, fields){
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    console.log(rows);
                    res.send(rows);
                }
            })
        }
    })
});

app.delete('/delete-location-ajax', function(req, res, next) {
    let data = req.body;
    let locationID = parseInt(data.location_id);
    let deleteLocation= `DELETE FROM locations WHERE location_id = ?;`;
  
    db.pool.query(deleteLocation, [locationID], function(error, rows, fields){
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    });
});

app.put('/update-location-ajax', function(req, res, next) {
    let data = req.body;
  
    let locationID = parseInt(data.location_id);
    let updatedWares = data.wares_capacity;
    let updatedAddress = data.address_line;
    let updatedCity = data.city;
    let updatedPostal = parseInt(data.postal_code);
    let updatedSitePhone = parseInt(data.site_phone);
  
    let queryUpdateLocation = `UPDATE locations SET wares_capacity = ?, address_line = ?, city = ?, postal_code = ?, site_phone = ? WHERE locations.location_id = ?`;
    let selectLocation = `SELECT * FROM locations WHERE location_id = ?`

    db.pool.query(queryUpdateLocation, [updatedWares, updatedAddress, updatedCity, updatedPostal, updatedSitePhone, locationID], function(error, rows, fields){
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            db.pool.query(selectLocation, [locationID], function(error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
        }
    });
});





/*
    LISTENER
*/
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});