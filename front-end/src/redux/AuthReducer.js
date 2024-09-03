const token = localStorage.getItem('authToken'); 
const role = localStorage.getItem('userRole'); 
const initialState = {
  token: token || null,
  isAuthenticated: !!token, 
  userRole: role || null,
  cartData: {}, // Initialize as an empty object or array, depending on your requirements
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload.token || state.token,
        isAuthenticated: true,
        userRole: action.payload.role,
      };
    case 'SET_CART_DATA':
      return {
        ...state,
        cartData: action.payload.cartData,
      };
    case 'LOGOUT':
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        userRole: null,
        cartData: {}, 
      };
    default:
      return state;
  }
};

export default authReducer;
