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




SELECT u.id as userId, u.username, u.name, o.id as orderId, o.status, o.total, c.quantity, p.id as productId, p.name, p.price, p.picture, p.description, p.size
FROM orderTable o
JOIN users u on u.id = o.userId
JOIN cart c on o.id = c.orderId
JOIN products p on p.id = c.productId
WHERE u.username = 'mirajones' and u.password = 'm'