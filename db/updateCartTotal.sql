UPDATE orderTable
SET total = $1
WHERE userId = $2 and status = true