INSERT INTO orderTable
(userid, status, total) 
VALUES ($1, true, 0)
RETURNING *