/*
    Citation for the following application:
    // Date: 3/16/2024
    // Adapted from the amazing work that has gone into the starter app resource
    // Contributors include George Kochera, Dr. Michael Curry and Prof. Danielle M. Safonte
    // Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
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
PORT = 11385;

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
    let employeeNametag = data.employee_nametag;
    let employeePhone = data.employee_phone;
  
    let queryUpdateWorld = `UPDATE employees SET employee_nametag = ?, employee_phone = ? WHERE employees.employee_id = ?`;
    let selectWorld = `SELECT * FROM employees WHERE employee_id = ?`
  
    db.pool.query(queryUpdateWorld, [employeeNametag, employeePhone, employeeID], function(error, rows, fields) {
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
    LOCATIONS ROUTES
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
    CUSTOMERS ROUTES
*/
app.get('/customers', function(req, res) {
    let query1;
    if (req.query.customerEmailSearch === undefined) {
        query1 = "SELECT * FROM customers;";
    } else {
        query1 = `SELECT * FROM customers WHERE email LIKE "${req.query.customerEmailSearch}%"`;
    }

    db.pool.query(query1, function(error, rows, fields){
        let customers = rows;
        return res.render('customers', {data: customers});
    })
});

app.post('/add-customer-ajax', function(req, res) {
    let data = req.body;

    let customer_name = data.customer_name;
    if (customer_name == "") {
        customer_name = 'NULL';
    }

    let email = data.email;
    if (email == "") {
        email = 'NULL';
    }

    let customer_phone = data.customer_phone;
    if (customer_phone == "") {
        customer_phone = 'NULL';
    }

    let store_credit = parseInt(data.store_credit);
    if (isNaN(store_credit)) {
        store_credit = 'NULL';
    }

    let total_purchases = parseInt(data.total_purchases);
    if (isNaN(total_purchases)) {
        total_purchases = 'NULL';
    }

    let query1 = `INSERT INTO customers (customer_name, email, customer_phone, store_credit, total_purchases) VALUES ('${customer_name}', '${email}', '${customer_phone}', '${store_credit}', '${total_purchases}')`;
    db.pool.query(query1, function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            let query2 = `SELECT * FROM customers;`;
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

app.delete('/delete-customer-ajax', function(req, res, next) {
    let data = req.body;
    let customerID = parseInt(data.customer_id);
    let deleteCustomerQuery = `DELETE FROM customers WHERE customer_id = ?`;

    db.pool.query(deleteCustomerQuery, [customerID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    });
});

app.put('/update-customer-ajax', function(req, res, next) {
    let data = req.body;
  
    let customerID = data.customer_id
    let customerName = data.customer_name;
    let email = data.email;
    let customerPhone = parseInt(data.customer_phone);
    let storeCredit = parseInt(data.store_credit);
    let totalPurchases = parseInt(data.total_purchases);
  
    let queryUpdateCustomer = `UPDATE customers SET customer_name = ?, email = ?, customer_phone = ?, store_credit = ?, total_purchases = ? WHERE customers.customer_id = ?`;
    let selectCustomer = `SELECT * FROM customers WHERE customer_id = ?`
  
    db.pool.query(queryUpdateCustomer, [customerName, email, customerPhone, storeCredit, totalPurchases, customerID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            db.pool.query(selectCustomer, [customerID], function(error, rows, fields) {
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
    PRODUCTS ROUTES
*/
app.get('/products', function(req, res) {
    let query1;
    if (req.query.productLabelSearch === undefined) {
        query1 = "SELECT * FROM products;";
    } else {
        query1 = `SELECT * FROM products WHERE label LIKE "${req.query.productLabelSearch}%"`;
    }

    db.pool.query(query1, function(error, rows, fields){
        let products = rows;
        return res.render('products', {data: products});
    })
});

app.post('/add-product-ajax', function(req, res) {
    let data = req.body;

    let price = data.price;
    if (isNaN(price)) {
        price = 'NULL';
    } else {
        price = Number(price);
    }

    let label = data.label;
    if (label == "") {
        label = 'NULL';
    }

    let designer = data.designer;
    if (designer == "") {
        designer = 'NULL';
    }

    let query1 = `INSERT INTO products (price, label, designer) VALUES (${price}, '${label}', '${designer}')`;
    db.pool.query(query1, function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            let query2 = `SELECT * FROM products;`;
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

app.delete('/delete-product-ajax', function(req, res, next) {
    let data = req.body;
    let productID = parseInt(data.product_id);
    let deleteProductQuery = `DELETE FROM products WHERE product_id = ?`;

    db.pool.query(deleteProductQuery, [productID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    });
});

app.put('/update-product-ajax', function(req, res, next) {
    let data = req.body;
  
    let productID = data.product_id
    let price = Number(data.price);
    let label = data.label;
    let designer = data.designer;
  
    let queryUpdateProduct = `UPDATE products SET price = ?, label = ?, designer = ? WHERE products.product_id = ?`;
    let selectProduct = `SELECT * FROM products WHERE product_id = ?`
  
    db.pool.query(queryUpdateProduct, [price, label, designer, productID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            db.pool.query(selectProduct, [productID], function(error, rows, fields) {
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
    PRODUCTS ROUTES
*/
app.get('/sales', function(req, res) {
    let query1;
    if (req.query.saleDateSearch === undefined) {
        query1 = "SELECT sale_id, address_line, employee_nametag, email, sale_date FROM sales INNER JOIN locations ON sales.lid = locations.location_id INNER JOIN employees ON sales.eid = employees.employee_id INNER JOIN customers ON sales.cid = customers.customer_id ORDER BY sale_id;";
    } else {
        query1 = `SELECT sale_id, address_line, employee_nametag, email, sale_date FROM sales INNER JOIN locations ON sales.lid = locations.location_id INNER JOIN employees ON sales.eid = employees.employee_id INNER JOIN customers ON sales.cid = customers.customer_id WHERE sale_date LIKE "${req.query.saleDateSearch}%"`;
    }

    let query2 = "SELECT * FROM locations;";
    let query3 = "SELECT * FROM employees;";
    let query4 = "SELECT * FROM customers;";
    db.pool.query(query1, function(error, rows, fields){
        let entries = rows
        console.log(entries);
        db.pool.query(query2, function(error, rows, fields){
            let locations = rows;
            db.pool.query(query3, (error, rows, fields) => {
                let employees = rows;
                db.pool.query(query4, (error, rows, fields) => {
                    let customers = rows;
                    return res.render('sales', {data: entries, locations: locations, employees: employees, customers: customers});
                });
            });
        });
    });
});

app.post('/add-sale-ajax', function(req, res) {
    let data = req.body;
    console.log(data);

    let location = data.lid;
    if (isNaN(location)) {
        location = 'NULL';
    } else {
        location = Number(location);
    }

    let employee = data.eid;
    if (isNaN(employee)) {
        employee = 'NULL';
    } else {
        employee = Number(employee);
    }

    let customer = data.cid;
    if (isNaN(customer)) {
        customer = 'NULL';
    } else {
        customer = Number(customer);
    }

    let date = data.sale_date

    let query1 = `INSERT INTO sales (lid, eid, cid, sale_date) VALUES ('${location}', '${employee}', '${customer}', '${date}')`;
    db.pool.query(query1, function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            let query2 = `SELECT sale_id, address_line, employee_nametag, email, sale_date FROM sales INNER JOIN locations ON sales.lid = locations.location_id INNER JOIN employees ON sales.eid = employees.employee_id INNER JOIN customers ON sales.cid = customers.customer_id;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    });
});

app.delete('/delete-sale-ajax', function(req, res, next) {
    let data = req.body;
    let saleID = parseInt(data.sale_id);
    let deleteProductQuery = `DELETE FROM sales WHERE sale_id = ?`;

    db.pool.query(deleteProductQuery, [saleID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    });
});

app.put('/update-sale-ajax', function(req, res, next) {
    let data = req.body;
  
    let saleID = data.sale_id
    let lid = Number(data.lid);
    let eid = Number(data.eid);
    let cid = Number(data.cid);
    let saleDate = data.sale_date
  
    let queryUpdateProduct = `UPDATE sales SET lid = ?, eid = ?, cid = ?, sale_date = ? WHERE sales.sale_id = ?`;
    let selectProduct = `SELECT sale_id, address_line, employee_nametag, email, sale_date FROM sales INNER JOIN locations ON sales.lid = locations.location_id INNER JOIN employees ON sales.eid = employees.employee_id INNER JOIN customers ON sales.cid = customers.customer_id WHERE sale_id = ?`;
  
    db.pool.query(queryUpdateProduct, [lid, eid, cid, saleDate, saleID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            db.pool.query(selectProduct, [saleID], function(error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    console.log(rows); // Debug
                    res.send(rows);
                }
            })
        }
    });
});





/*
    EMPLOYEES_LOCATIONS ROUTES
*/
app.get('/employees_locations', function(req, res) { 
    let query0 = "SELECT elid, employee_nametag, address_line FROM employees INNER JOIN location_has_employees ON employees.employee_id = location_has_employees.eid INNER JOIN locations ON locations.location_id = location_has_employees.lid ORDER BY employee_id;";    
    let query1 = "SELECT * FROM employees;";
    let query2 = "SELECT * FROM locations;";

    db.pool.query(query0, function(error, rows, fields){
        let entries = rows
        console.log(entries);
        db.pool.query(query1, function(error, rows, fields){
            let employees = rows;
            db.pool.query(query2, (error, rows, fields) => {
                let locations = rows;
                return res.render('employees_locations', {data: entries, employees: employees, locations: locations});
            });
        });
    });
});

app.post('/add-employees-locations-ajax', function(req, res) {
    let data = req.body;

    let employee_id = data.employee_id;
    if (isNaN(employee_id)) {
        employee_id = 'NULL';
    } else {
        employee_id = Number(employee_id);
    }

    let location_id = data.location_id;
    if (isNaN(location_id)) {
        location_id = 'NULL';
    } else {
        location_id = Number(location_id);
    }

    let query1 = `INSERT INTO location_has_employees (lid, eid) VALUES (${location_id}, ${employee_id})`;
    db.pool.query(query1, function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            let query2 = "SELECT elid, employee_nametag, address_line FROM employees INNER JOIN location_has_employees ON employees.employee_id = location_has_employees.eid INNER JOIN locations ON locations.location_id = location_has_employees.lid ORDER BY employee_id;";
            db.pool.query(query2, function(error, rows, fields){
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    console.log(rows); //debug line
                    res.send(rows);
                }
            });
        }
    });
});

app.delete('/delete_employees_locations-ajax', function(req, res, next) {
    let data = req.body;
    let elid = parseInt(data.elid);
    let deleteEntryQuery = `DELETE FROM location_has_employees WHERE elid = ?`;

    db.pool.query(deleteEntryQuery, [elid], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    });
});





/*
    LOCATION_INVENTORY ROUTES
*/
app.get('/location_inventory', function(req, res) {  
    let query0 = "SELECT plid, address_line, label FROM locations INNER JOIN location_has_products ON locations.location_id = location_has_products.lid INNER JOIN products ON products.product_id = location_has_products.pid ORDER BY address_line;";    
    let query1 = "SELECT * FROM products;";
    let query2 = "SELECT * FROM locations;";

    db.pool.query(query0, function(error, rows, fields){
        let entries = rows
        db.pool.query(query1, function(error, rows, fields){
            let products = rows;
            db.pool.query(query2, (error, rows, fields) => {
                let locations = rows;
                return res.render('location_inventory', {data: entries, products: products, locations: locations});
            });
        });
    });
});

app.post('/add-location-inventory-ajax', function(req, res) {
    let data = req.body;

    let location_id = data.location_id;
    if (isNaN(location_id)) {
        location_id = 'NULL';
    } else {
        location_id = Number(location_id);
    }

    let product_id = data.product_id;
    if (isNaN(product_id)) {
        product_id = 'NULL';
    } else {
        product_id = Number(product_id);
    }

    let query1 = `INSERT INTO location_has_products (lid, pid) VALUES (${location_id}, ${product_id})`;
    db.pool.query(query1, function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            let query2 = "SELECT plid, address_line, label FROM locations INNER JOIN location_has_products ON locations.location_id = location_has_products.lid INNER JOIN products ON products.product_id = location_has_products.pid;";
            db.pool.query(query2, function(error, rows, fields){
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    console.log(rows); //debug line
                    res.send(rows);
                }
            });
        }
    });
});

app.delete('/delete_location-inventory-ajax', function(req, res, next) {
    let data = req.body;
    let plid = parseInt(data.plid);
    let deleteEntryQuery = `DELETE FROM location_has_products WHERE plid = ?`;

    db.pool.query(deleteEntryQuery, [plid], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    });
});





/*
    EMPLOYEES_LOCATIONS ROUTES
*/
app.get('/products_in_sales', function(req, res) {  
    let query0 = "SELECT spid, sale_id, quantity, label FROM sale_has_products INNER JOIN sales ON sale_has_products.sid = sales.sale_id INNER JOIN products ON products.product_id = sale_has_products.pid;";     
    let query1 = "SELECT * FROM sales;";
    let query2 = "SELECT * FROM products;";

    db.pool.query(query0, function(error, rows, fields){
        let entries = rows
        console.log(entries)
        db.pool.query(query1, function(error, rows, fields){
            let sales = rows;
            db.pool.query(query2, (error, rows, fields) => {
                let products = rows;
                return res.render('products_in_sales', {data: entries, sales: sales, products: products});
            });
        });
    });
});

app.post('/add-products_in_sales-ajax', function(req, res) {
    let data = req.body;

    let sale_id = data.sale_id;
    if (isNaN(sale_id)) {
        sale_id = 'NULL';
    } else {
        sale_id = Number(sale_id);
    }

    let product_id = data.product_id;
    if (isNaN(product_id)) {
        product_id = 'NULL';
    } else {
        product_id = Number(product_id);
    }

    let quantity = data.quantity;
    if (isNaN(quantity)) {
        quantity = 'NULL';
    } else {
        quantity = Number(quantity);
    }

    let query1 = `INSERT INTO sale_has_products (sid, pid, quantity) VALUES (${sale_id}, ${product_id}, ${quantity})`;
    db.pool.query(query1, function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            let query2 = "SELECT spid, sale_id, quantity, label FROM sale_has_products INNER JOIN sales ON sale_has_products.sid = sales.sale_id INNER JOIN products ON products.product_id = sale_has_products.pid;";
            db.pool.query(query2, function(error, rows, fields){
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    console.log(rows); //debug line
                    res.send(rows);
                }
            });
        }
    });
});

app.put('/update-products_in_sales-ajax', function(req, res, next) {
    let data = req.body;
  
    let saleID = data.sale_id;
    let productID = data.product_id;
    let quantity = data.quantity;
  
    let queryUpdateWorld = `UPDATE sale_has_products SET sid = ?, pid = ?, quantity = ? WHERE sid = ? AND pid = ?`;
    let selectWorld = `SELECT spid, sale_id, quantity, label FROM sale_has_products INNER JOIN sales ON sale_has_products.sid = sales.sale_id INNER JOIN products ON products.product_id = sale_has_products.pid WHERE sale_has_products.sid = ? AND sale_has_products.pid = ?`
  
    db.pool.query(queryUpdateWorld, [saleID, productID, quantity, saleID, productID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            db.pool.query(selectWorld, [saleID, productID], function(error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    console.log(rows);
                    res.send(rows);
                }
            })
        }
    });
});

app.delete('/delete-products_in_sales-ajax', function(req, res, next) {
    let data = req.body;
    let spid = parseInt(data.spid);
    let deleteEntryQuery = `DELETE FROM sale_has_products WHERE spid = ?`;

    db.pool.query(deleteEntryQuery, [spid], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    });
});





/*
    LISTENER
*/
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});