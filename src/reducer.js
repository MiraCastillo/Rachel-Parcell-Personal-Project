var initialState = {
    userId : 0,
    username : "",
    userUserName : "",
    orderId : 0,
    products : [],
    total: 0,
    loggedIn: false,
    quantity: 0,    
}

const UPDATE_USERID = "UPDATE_USERID";

export function updateUserId(id) {
    console.log(id)
    return{
        type: UPDATE_USERID,
        payload: id
    }
}

const UPDATE_USERNAME = "UPDATE_USERNAME";

export function updateUsername(username) {
    return{
        type: UPDATE_USERNAME,
        payload: username
    }
}

const UPDATE_USER_NAME = "UPDATE_USER_NAME";

export function updateUserName(name){
    return{
        type: UPDATE_USER_NAME,
        payload: name
    }
}

const UPDATE_ORDERID = "UPDATE_ORDERID";

export function updateOrderId(orderId) {
    return{
        type: UPDATE_ORDERID,
        payload: orderId
    }
}

const UPDATE_PRODUCTS = "UPDATE_PRODUCTS";

export function updateProducts(products) {
    return{
        type: UPDATE_PRODUCTS,
        payload: products
    }
}

const UPDATE_TOTAL = "UPDATE_TOTAL";

export function updateTotal(total){
    return{
        type: UPDATE_TOTAL,
        payload: total
    }
};

const UPDATE_LOGGEDIN_STATUS = "UPDATE_LOGGEDIN_STATUS";

export function updateLoggedInStatus(bool) {
    return{
        type: UPDATE_LOGGEDIN_STATUS,
        payload: bool
    }
}

const UPDATE_QUANTITY = "UPDATE_QUANTITY";

export function updateQuantity(num) {
    return{
        type: UPDATE_QUANTITY,
        payload: num
    }
}



export default function reducer(state = initialState, action) {
    switch(action.type) {
        case UPDATE_TOTAL:
            return Object.assign({}, state, {total: action.payload});
        case UPDATE_USERID:
        // console.log(action.payload)
            return Object.assign({}, state, {userId: action.payload});
        case UPDATE_USERNAME:
            return Object.assign({}, state, {username: action.payload});
        case UPDATE_USER_NAME:
            return Object.assign({}, state, {userUserName: action.payload});
        case UPDATE_ORDERID:
            return Object.assign({}, state, {orderId: action.payload});
        case UPDATE_PRODUCTS:
            return Object.assign({}, state, {products: action.payload});
        case UPDATE_LOGGEDIN_STATUS:
            return Object.assign({}, state, {loggedIn: action.payload});
        case UPDATE_QUANTITY:
            return Object.assign({}, state, {quantity: action.payload});
        default:
        return state;
    }
}

