var express = require("express");
var bodyParser = require("body-parser");
var massive = require("massive");
var session = require("express-session");
var c = require("./controller");

require("dotenv").config();
var app = express();
app.use(bodyParser.json())

var {SERVER_PORT, URI, SESSION_SECRET, } = process.env

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized:true
}))

massive(URI).then(db => {
    console.log("connected to the database")
    app.set('db', db)
})

var checkForSession = (req, res, next)=>{
    console.log('middleware')
    if(req.session.user){
        next();
    } else {
        console.log("hit")
        req.session.user = {id:0, loggedIn:false, orderid:0}
        next()
    }
};

app.get("/api/allProducts", c.read)
app.post("/api/loginUser", checkForSession, c.check)
app.post("/api/allUserInfo", c.allInfo)
app.post("/api/newUser", c.newUser)
app.get("/api/getDresses", c.dresses)
app.get("/api/getTops", c.tops)
app.get("/api/getSkirts", c.skirts)
app.get("/api/getSpring", c.spring)
app.get("/api/product/:id", c.item)

var checkingForUser = (req, res, next) => {
    console.log("I'm checking if you're logged in")
    if(req.session.user.loggedIn === true){
        next();
    } else{
        res.sendStatus(401);
    }
}
app.use(checkingForUser)

app.post("/api/addToCart/:id", c.addToCart)
app.get("/api/check", c.checking)
app.get("/api/getCart", c.cart)
app.delete("/api/deleteItem", c.delete)
app.post("/api/payment", c.payment)


app.listen(SERVER_PORT, console.log(`Zombies to fight on port ${SERVER_PORT}`))