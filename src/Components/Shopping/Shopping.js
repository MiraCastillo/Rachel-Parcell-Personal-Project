import React, {Component} from "react";
import Nav from "./../Nav/Nav";
import axios from "axios";
import "./Shopping.css";
import {Link} from "react-router-dom";
import Footer from "./../Footer/Footer";


export default class Shopping extends Component{
    constructor(){
        super();
        this.state={
            products: []
        }
    }

    componentDidMount(){
        axios.get("/api/allProducts").then(products => {
            this.setState({products:products.data})
        })
    }

    render(){
        const info = this.state.products.map((product, i) => {
            return(
                <Link to={`/product/${product.id}`} key={i} className="product-container">
                    <img className="product-image" src={product.picture} />
                    <div className="product-name">{product.name}</div>
                    <div className="product-price">${product.price}.00</div>
                </Link>
            )
        });
        return(
            <div>
                <Nav />
                <div className="all-products">
                {info}
                </div>
                <Footer />
            </div>
        )
    }
}