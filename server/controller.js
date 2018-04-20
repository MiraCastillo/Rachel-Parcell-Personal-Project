require("dotenv").config();
var stripe = require("stripe")(process.env.S_STRIPE_KEY);
var bcrypt = require("bcryptjs");

module.exports = {
  read: (req, res) => {
    req.app
      .get("db")
      .getProducts()
      .then(products => {
        res.status(200).send(products);
      });
  },
  check: (req, res) => {
    var { username, password } = req.body;
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        req.app
          .get("db")
          .checkForUser([username, hash])
          .then(user => {
            console.log(user[0]);
            if (user[0]) {
              console.log("checking", user[0].id);
              req.session.user.id = user[0].id;
              req.session.user.loggedIn = true;
              req.app
                .get("db")
                .checkingForOrder([user[0].id])
                .then(orderInfo => {
                  if (orderInfo[0]) {
                    console.log("active order", orderInfo[0].id);
                    req.session.user.orderId = orderInfo[0].id;
                    console.log(req.session.user.orderId);
                  } else {
                    console.log("non-active order", user[0].id);
                    req.app
                      .get("db")
                      .createNewOrder([user[0].id])
                      .then(info => {
                        req.session.user.orderId = info.id;
                      });
                  }
                  res.status(200).send(user);
                });
            } else {
              res.status(204).send(user);
            }
          });
      });
    });
  },
  allInfo: (req, res, next) => {
    var { username, password } = req.body;
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        req.app
          .get("db")
          .getAll([username, hash])
          .then(info => {
            req.app
              .get("db")
              .getUser([username, hash])
              .then(inf => {
                res.status(200).send([inf, req.session.user, info]);
              });
          });
      });
    });
  },
  newUser: (req, res) => {
    var { name, username, password } = req.body;
    req.app
      .get("db")
      .checkForUser(username)
      .then(result => {
        if (result[0]) {
          res.status(406).send(result);
        } else {
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
              req.app
                .get("db")
                .createNewUser([username, hash, name])
                .then(user => {
                  console.log(user[0].id);
                  req.session.user.id = user[0].id;
                  req.session.user.loggedIn = true;
                  console.log("non-active order", user[0].id);
                  req.app
                    .get("db")
                    .createNewOrder([user[0].id])
                    .then(info => {
                      req.session.user.orderId = info[0].id;
                      console.log(req.session.user);
                      res.status(200).send(req.session.user);
                    });
                });
            });
          });
        }
      });
  },
  dresses: (req, res) => {
    req.app
      .get("db")
      .getDresses()
      .then(products => {
        res.status(200).send(products);
      });
  },
  tops: (req, res) => {
    req.app
      .get("db")
      .getTops()
      .then(tops => {
        res.status(200).send(tops);
      });
  },
  skirts: (req, res) => {
    req.app
      .get("db")
      .getSkirts()
      .then(skirts => {
        res.status(200).send(skirts);
      });
  },
  spring: (req, res) => {
    req.app
      .get("db")
      .getSpringOutfits()
      .then(clothes => {
        res.status(200).send(clothes);
      });
  },
  item: (req, res) => {
    req.app
      .get("db")
      .getProduct([req.params.id])
      .then(item => {
        res.status(200).send(item);
      });
  },
  addToCart: (req, res) => {
    var { id } = req.params;
    var { orderId } = req.session.user;
    console.log(req.params, req.session.user.orderId, req.body);
    var { quantity } = req.body;
    req.app
      .get("db")
      .addToCart([id, orderId, quantity])
      .then(rest => {
        res.sendStatus(200);
      });
  },
  cart: (req, res) => {
    var { orderId } = req.session.user;
    var { userId } = req.body;
    console.log(req.body);
    req.app
      .get("db")
      .getCartItems(userId, orderId)
      .then(info => {
        res.status(200).send(info);
      });
  },
  delete: (req, res) => {
    var { id } = req.params;
    var { orderId, id: userId } = req.session.user;
    console.log(id, orderId);
    req.app
      .get("db")
      .deleteFromCart([orderId, id])
      .then(rest => {
        req.app
          .get("db")
          .getCartItems([userId, orderId])
          .then(info => {
            res.status(200).send(info);
          });
      });
  },
  payment: (req, res, next) => {
    const charge = stripe.charges.create(
      {
        amount: req.body.amount,
        currency: "usd",
        source: req.body.token.id,
        description: "Test charge from Rachel Parcell"
      }
      // , function(err, charge) {
      //     if(err) {
      //         res.sendStatus(500)
      //     } else{
      //         return res.sendStatus(200)
      //     }
      // }
    );
    req.app
      .get("db")
      .changeStatus([req.session.user.orderId, req.session.user.id])
      .then(resp => {
        var { id } = req.session.user;
        console.log("non-active order", id);
        req.app
          .get("db")
          .createNewOrder(id)
          .then(info => {
            //   console.log(info[0].id, info[0], info)
            req.session.user.orderId = info[0].id;
            req.app
              .get("db")
              .getCartItems([id, req.session.user.orderId])
              .then(cart => {
                res.status(200).send([req.session.user, cart]);
              });
          });
      });
  },
  newQuantity: (req, res, next) => {
    var { quantity, productId } = req.body;
    var { id, orderId } = req.session.user;
    req.app
      .get("db")
      .updateQuantity(orderId, productId, +quantity)
      .then(rest => {
        req.app
          .get("db")
          .getCartItems([id, orderId])
          .then(info => {
            res.status(200).send(info);
          });
      });
  },
  updateTotal: (req, res) => {
    var { total } = req.body;
    var { id } = req.session.user;
    console.log(req.body.total, req.session.user.id);
    req.app
      .get("db")
      .updateCartTotal(total, id)
      .then(rest => {
        res.sendStatus(200);
      });
  }
};
