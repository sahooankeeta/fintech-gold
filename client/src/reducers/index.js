import * as actionType from "../helpers/constants.js";

const initialState = {
  isLoading: false,
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : {
        items: [],
        total: 0,
      },
  orders: localStorage.getItem("orders")
    ? JSON.parse(localStorage.getItem("orders"))
    : [],
  profile: localStorage.getItem("profile")
    ? JSON.parse(localStorage.getItem("profile"))
    : {},
  error: "",
  products: localStorage.getItem("products")
    ? JSON.parse(localStorage.getItem("products"))
    : [],
  product: localStorage.getItem("product")
    ? JSON.parse(localStorage.getItem("product"))
    : {},
};
const reducers = (state = initialState, action) => {
  switch (action.type) {
    case actionType.AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return {
        ...state,
        profile: action.data,
        isLoading: false,
        error: null,
        cart: action.data.result.cart,
      };
    case actionType.FETCH_ALL:
      //console.log(action.payload);
      localStorage.setItem("products", JSON.stringify(action?.payload));
      return {
        ...state,
        products: action.payload,
      };
    case actionType.DELETE_ITEM:
      return {
        ...state,
        products: state.products.filter((item) => item._id !== action.payload),
      };
    case actionType.FETCH_ITEM:
      localStorage.setItem("product", JSON.stringify(action?.payload));
      return {
        ...state,
        product: action.payload,
      };
    case actionType.ADD_TO_CART: //ADD PRODUCT TO CART
      return {
        ...state,
        cart: {
          ...state.cart,
          items: [action.payload, ...state.cart.items],
          total: state.cart.total + action.payload.price,
        },
        product: { ...state.product, inCart: true },
      };
    case actionType.REMOVE_FROM_CART: //REMOVE PRODUCT FROM CART
      let product;
      state.cart.items.forEach((item) => {
        if (item.id === action.payload) product = item;
      });
      return {
        ...state,
        cart: {
          ...state.cart,
          items: state.cart.items.filter((item) => item.id !== action.payload),
          total: state.cart.total - product.price * product.qty,
        },

        product: { ...state.product, inCart: false },
      };
    case actionType.SET_LOADING: //HANDLE LOADING EVENT
      return { ...state, isLoading: action.payload };
    case actionType.SET_ERROR:
      return { ...state, error: action.payload };
    case actionType.INCREASE_QUANTITY: //INCREASE ITEM QUANTITY
      return {
        ...state,
        cart: {
          ...state.cart,
          items: state.cart.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, qty: item.qty + 1 }
              : item
          ),
          total: state.cart.total + action.payload.price,
        },
      };
    case actionType.DECREASE_QUANTITY: //DECREASE ITEM QUANTITY
      return {
        ...state,
        cart: {
          ...state.cart,
          items: state.cart.items.map((item) =>
            item.id === action.payload.id && item.qty > 1
              ? { ...item, qty: item.qty - 1 }
              : item
          ),
          total:
            action.payload.qty > 1
              ? state.cart.total - action.payload.price
              : state.cart.total,
        },
      };
    case actionType.UPDATE_CART_TOTAL:
      // console.log(action.payload);
      return {
        ...state,
        cart: {
          ...state.cart,
          total: action.payload,
        },
      };
    case actionType.EMPTY_CART:
      return {
        ...state,
        cart: {
          ...state.cart,
          items: [],
          total: 0,
        },
      };
    case actionType.LOGOUT:
      localStorage.clear();

      return {
        ...state,
        products: [],
        orders: [],
        isLoading: false,
        error: "",
        profile: {},
        product: {},
      };
    case actionType.UPDATE_CART:
      return {
        ...state,
        cart: action.payload,
      };
    case actionType.ADD_ORDER:
      return {
        ...state,
        orders: [action.payload, ...state.orders],
      };
    case actionType.FETCH_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };
    case actionType.GET_ORDER:
      return {
        ...state,
        order: action.payload,
      };
    default:
      return {
        ...state,
        profile: localStorage.getItem("profile")
          ? JSON.parse(localStorage.getItem("profile"))
          : {},
        isLoading: false,
        products: localStorage.getItem("products")
          ? JSON.parse(localStorage.getItem("products"))
          : [],
        cart: localStorage.getItem("cart")
          ? JSON.parse(localStorage.getItem("cart"))
          : {
              items: [],
              total: 0,
            },
        orders: localStorage.getItem("orders")
          ? JSON.parse(localStorage.getItem("orders"))
          : [],
        error: "",
      };
  }
};
export default reducers;
