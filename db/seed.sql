CREATE TABLE products ( id SERIAL PRIMARY KEY,
                        type TEXT,
                        season TEXT, 
                        name TEXT,
                        price REAL,
                        picture TEXT,
                        description TEXT,
                        size TEXT)

CREATE TABLE users ( id SERIAL PRIMARY KEY, 
                    username TEXT,
                    password TEXT,
                    name TEXT)

CREATE TABLE cart ( orderID INT REFERENCES orderTable(id),
                    productID INT REFERENCES products(id),
                    quantity int)

CREATE TABLE orderTable ( orderID SERIAL PRIMARY KEY,
                    userID INT REFERENCES users(id),
                    status BOOLEAN,
                    total REAL)