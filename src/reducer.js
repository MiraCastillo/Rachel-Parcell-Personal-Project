var initialState = {
    userId : 0,
    userName : "",
    userUserName : "",
    orderId : 0,
    products : [],
    total: 0,
    loggedIn: false
}

const CHANGE_TOTAL = "CHANGE_TOTAL";

export function changeTotal(total){
    return{
        type: CHANGE_TOTAL,
        payload: total
    }
};



export default function reducer(state = initialState, action) {
    switch(action.type) {
        case CHANGE_TOTAL:
            return Object.assign({}, state, {total: action.payload});
        default:
        return state;
    }
}

