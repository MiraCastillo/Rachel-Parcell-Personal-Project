SELECT c.quantity, o.total, p.name, p.price, p.picture, p.id 
FROM cart c
JOIN orderTable o on c.orderid = o.id 
JOIN products p on c.productid = p.id
JOIN users u on u.id = o.userid
WHERE u.id = $1 and c.orderid = $2