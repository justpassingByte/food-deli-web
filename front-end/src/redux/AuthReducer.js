// src/redux/authReducer.js

const token = localStorage.getItem('authToken'); 

const initialState = {
  token: token || null,
  isAuthenticated: !!token, 
  userRole: null,
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
    case 'LOGOUT':
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        userRole: null,
      };
    default:
      return state;
  }
};

export default authReducer;
