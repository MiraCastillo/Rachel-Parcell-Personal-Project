SELECT quantity, total, name, price, picture, p.id FROM cart c
JOIN orderTable o on c.orderid = o.id
JOIN products p on c.productid = p.id