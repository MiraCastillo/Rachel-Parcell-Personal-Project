import {Route, Switch} from "react-router-dom";
import React from "react";
import Home from "./Components/Home/Home"
import Product from "./Components/Product/Product"
import Shopping from "./Components/Shopping/Shopping"
import Cart from "./Components/Cart/Cart"
import Login from "./Components/Login/Login"
import SignUp from "./Components/SignUp/SignUp"
import Tops from "./Components/Tops/Tops"
import Skirts from "./Components/Skirts/Skirts"
import Dresses from "./Components/Dresses/Dresses"
import Spring from "./Components/Spring/Spring"


export default
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/shopping" component={Shopping} />
            <Route path="/cart" component={Cart} />
            <Route path="/product/:id" component={Product} />
            <Route path="/login" component={Login} />
            <Route path="/signUp" component={SignUp} />
            <Route path="/tops" component={Tops} />
            <Route path="/skirts" component={Skirts} />
            <Route path="/dresses" component={Dresses} />
            <Route path="/spring" component={Spring} />
        </Switch>