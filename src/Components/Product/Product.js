import React, {Component} from "react";
import Nav from "./../Nav/Nav"
import axios from "axios"
import swal from "sweetalert2";
import "./Product.css";
import {updateQuantity} from "./../../reducer";
import {connect} from "react-redux";


class Product extends Component{
    constructor(){
        super();
        this.state= {
            product:[],
            quantity: 0,
            loggedIn: false
        }
    }

    componentDidMount(){
        axios.get(`/api/product/${this.props.match.params.id}`).then(item => {
            this.setState({product: item.data})
        })
        console.log(this.props)
    } 

    handleQuantity(e) {
        this.setState({quantity:e})
    }

    addToCart(id) {
        this.props.updateQuantity(this.state.quantity)
        axios.post(`/api/addToCart/${id}`, {orderId: this.props.orderId, quantity: this.state.quantity}).then(res => {
            swal({
                position: "top-end",
                type: "success",
                title: "Added to cart!",
                showConfirmButton: false,
                timer: 1500
            })
        })
    }

    render(){
        var specificInfo = this.state.product.map(product => {
            return(
                <div className="the-product-container">
                    <img src={product.picture} className="single-picture"/>
                    <div className="single-info">
                    <div className="single-name">{product.name}</div>
                    <div className="single-price">${product.price}.00</div>
                    <div className="single-size">{product.size}</div>
                    <div className="quantity-container">
                    <div className="quantity-label">Quantity: </div>
                    <input onChange={(e) => this.handleQuantity(e.target.value)} className="single-quantity" placeholder="#"/>
                    </div>
                    <button onClick={() => this.addToCart(product.id)} className="add-to-cart">Add to cart</button>
                    <div className="single-description">{product.description}</div>
                    </div>
                </div>
            )
        })
        return(
            <div className="whole-page">
                <Nav />
                {specificInfo}
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {orderId} = state
    return{
        orderId
    }
}

export default connect(mapStateToProps, {updateQuantity})(Product)