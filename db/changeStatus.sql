UPDATE orderTable 
SET status = false
WHERE id = $1 and userId = $2