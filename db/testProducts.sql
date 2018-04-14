INSERT INTO users
(username, password, name)
VALUES ('mirajones', 'm', 'Mira Jones')

INSERT INTO ordertable
(userid, status, total)
VALUES(1, true, 148)

INSERT INTO cart
(productid, orderid, quantity)
VALUES(1, 1, 4)

INSERT INTO products
(type, season, name, price, picture, description, size)
VALUES ('dress', 'fall', 'Blushing Bell Sleeve Dress', 148.00, 'https://cdn.shopify.com/s/files/1/1226/7704/products/DSC_4619-Edit_1024x1024.jpg?v=1521234029', 'The best-selling bell sleeve dress is back and this time, in a beautiful blush pink. This perfectly fitted dress featuring elegant bell sleeves and a gold exposed zipper will flatter any figure and is the epitome of exquisite style this season. Main: 67% Rayon 29% Nylon 4% Spandex. Machine washable, Hang dry only. Rachel is wearing an XXS. Imported.', 'XXS')


INSERT INTO products
(type, season, name, price, picture, description, size)
VALUES ('skirt', 'spring', 'Peony Blossom Pleated Skirt', 175.00, 'https://cdn.shopify.com/s/files/1/1226/7704/products/DSC_4570-Edit-Edit_1024x1024.jpg?v=1521478938', 'Our Pleated Midi Skirt is back! This skirt is a customer favorite and we are thrilled to be bringing it back in this stunning custom peony watercolor print this Spring. Pair with our Shea Crepe Top for the ultimate feminine Spring look. Main: 100% Polyester | Lining: 97% Polyester 3% Elastane. Machine washable, Hang dry only. Rachel is wearing an XS. Fully Lined. Imported.', 'XXS')

INSERT INTO products
(type, season, name, price, picture, description, size)
VALUES ('top', 'spring', 'Shea Creme Top', 82.00, 'https://cdn.shopify.com/s/files/1/1226/7704/products/DSC_4236-Edit_1024x1024.jpg?v=1521233263', 'Truly our most versatile top of this season, add the Shea Crepe Top to your wardrobe as your new go-to closet staple. The high-end crepe material, exposed gold zipper, and shoulder ruffles are all you need and more to dress up any look. Pair with jeans, our Peony Blossom Pleated Skirt, or even our Paris Garden Skirt! Main: 100% Polyester | Lining: 97% Polyester 3% Elastane. Machine washable, Hang dry only. Rachel is wearing an XS. Fully Lined. Imported.', 'XXS')

SELECT *
FROM orderTable AS o
JOIN cart AS c ON o.id = c.orderid
JOIN products p ON c.productid = p.id