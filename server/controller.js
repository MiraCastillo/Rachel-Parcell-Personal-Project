require("dotenv").config();
var stripe = require("stripe")(process.env.S_STRIPE_KEY);

module.exports = {
    read: (req, res) => {
        req.app.get("db").getProducts().then(products => {
            res.status(200).send(products)
        })
    },
    check: (req, res) => {
        var {username, password} = req.body
        req.app.get("db").checkForUser([username, password]).then(user => {
            console.log("checking")
            
            if(user[0]){
                req.session.user.id = user[0].id;
                req.session.user.loggedIn = true;
                req.app.get("db").checkingForOrder([user[0].id]).then(orderInfo => {
                    if(orderInfo[0]){
                        if(orderInfo[0].status === true){
                            console.log("active order")
                            req.session.user.orderid = orderInfo[0].id
                        } 
                        else {
                            console.log("non-active order", user[0].id)
                            req.app.get("db").createNewOrder([user[0].id]).then(info => {
                                req.session.user.orderid = info.id
                            })
                        }
                    }
                    res.status(200).send(user)
                })
            }
            
        })
    },
    allInfo: (req, res, next) => {
        var{username, password} = req.body
        req.app.get("db").getAll([username, password]).then(info => {
            res.status(200).send([info, req.session.user])
        })
    },
    newUser: (req, res) =>{
        var {name, username, password} = req.body
        req.app.get("db").createNewUser([username, password, name]).then(user => {
            res.status(200).send(user)
        })
    },
    dresses: (req, res) =>{
        req.app.get("db").getDresses().then(products =>{
            res.status(200).send(products)
        })
    },
    tops:(req, res) => {
        req.app.get("db").getTops().then(tops => {
            res.status(200).send(tops)
        })
    },
    skirts:(req, res) => {
        req.app.get("db").getSkirts().then(skirts => {
            res.status(200).send(skirts)
        })
    },
    spring:(req, res) => {
        req.app.get("db").getSpringOutfits().then(clothes => {
            res.status(200).send(clothes)
        })
    },
    item: (req, res) => {
        req.app.get("db").getProduct([req.params.id]).then(item => {
            res.status(200).send(item)
        })
    },
    addToCart: (req, res) => {
        var {id} = req.params;
        console.log(req.params, req.body)
        var {orderId, quantity} = req.body
        req.app.get("db").addToCart([id, orderId, quantity]).then(rest => {
            res.sendStatus(200)
        })
    },
    checking: (req, res) => {
        
    },
    cart: (req, res) => {
        req.app.get("db").getCartItems().then(info => {
            res.status(200).send(info)
        })
    },
    delete: (req, res) => {
        req.app.get("db").deleteFromCart([req.session.orderid, req.params.id]).then(res => {
            res.sendStatus(200)
        })
    },
    payment: (req, res, next) => {
        const charge = stripe.charges.create({
            amount: req.body.amount,
            currency: "usd",
            source: req.body.token.id,
            description: "Test charge from Rachel Parcell"
        }, function(err, charge) {
            if(err) {
                console.log(err)
                res.sendStatus(500)
            } else{
                return res.sendStatus(200)
            }
        })
    },
    
}