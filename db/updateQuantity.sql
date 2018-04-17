UPDATE cart
SET quantity = $3
WHERE orderid = $1 and productid = $2
RETURNING *