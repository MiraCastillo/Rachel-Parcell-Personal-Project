INSERT INTO users
(username, password, name)
VALUES ($1, $2, $3)
RETURNING *