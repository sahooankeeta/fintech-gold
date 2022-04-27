import * as api from "../api/index.js";
import {
  AUTH,
  SET_LOADING,
  LOGOUT,
  SET_ERROR,
  FETCH_ALL,
  DELETE_ITEM,
  FETCH_ITEM,
  UPDATE_CART,
  ADD_ORDER,
  FETCH_ORDERS,
  GET_ORDER,
  DELETE_ORDER,
} from "./../helpers/constants";
export const signin = (formData, router) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING, payload: true });
    const { data } = await api.signIn(formData);
    dispatch({ type: SET_LOADING, payload: false });
    if (data.type === "error")
      dispatch({ type: SET_ERROR, payload: data.message });
    else {
      dispatch({ type: AUTH, data });
      router.push("/");
    }
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.message });
    dispatch({ type: SET_LOADING, payload: false });
  }
};
export const signup = (formData, router) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING, payload: true });
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });
    dispatch({ type: SET_LOADING, payload: false });
    router.push("/");
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.message });
    dispatch({ type: SET_LOADING, payload: false });
  }
};
export const getAll = (item, gram) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING, payload: true });
    const { data } = await api.fetchAll(item, gram);

    dispatch({ type: FETCH_ALL, payload: data.items });
    dispatch({ type: SET_LOADING, payload: false });
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.message });
    dispatch({ type: SET_LOADING, payload: false });
  }
};
export const addProduct = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.addItem(formData);

    router.push(`/shop/${data.item.category}`);
  } catch (error) {
    console.log(error);
  }
};
export const deleteProduct = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteItem(id);
    dispatch({ type: DELETE_ITEM, payload: id });
  } catch (error) {
    console.log(error);
  }
};
export const updateProduct = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.updateItem(formData);

    router.push(`/shop/${data.item.category}`);
  } catch (error) {
    console.log(error);
  }
};
export const getProduct = (id) => async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });

  try {
    const { data } = await api.fetchProduct(id);

    if (data?.error) dispatch({ type: SET_ERROR, payload: data.error });
    else
      dispatch({
        type: FETCH_ITEM,
        payload: data.item,
      });
    dispatch({ type: SET_LOADING, payload: false });
  } catch (err) {
    dispatch({ type: SET_ERROR, payload: err.message });
    dispatch({ type: SET_LOADING, payload: false });
  }
};
export const addCart = (item) => async (dispatch) => {
  try {
    const { data } = await api.addCart(item);
    dispatch({ type: UPDATE_CART, payload: data });
  } catch (err) {
    console.log(err);
  }
};
export const removeCart = (user, id) => async (dispatch) => {
  try {
    const { data } = await api.removeCart(user, id);
    dispatch({ type: UPDATE_CART, payload: data });
  } catch (err) {
    console.log(err);
  }
};
export const updateCartItem = (user, product, type) => async (dispatch) => {
  try {
    const { data } = await api.updateCartItem(user, product, type);
    dispatch({ type: UPDATE_CART, payload: data });
  } catch (err) {
    console.log(err);
  }
};
export const emptyCart = (user) => async (dispatch) => {
  try {
    const { data } = await api.emptyCart(user);
    dispatch({ type: UPDATE_CART, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const addOrder = (item) => async (dispatch) => {
  try {
    const { data } = await api.addOrder(item);

    dispatch({ type: ADD_ORDER, payload: data.item });
  } catch (err) {
    console.log(err);
  }
};
export const fetchOrders = (user) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING, payload: true });
    const { data } = await api.fetchOrders(user);

    dispatch({ type: FETCH_ORDERS, payload: data.items });
    dispatch({ type: SET_LOADING, payload: false });
  } catch (err) {
    dispatch({ type: SET_ERROR, payload: err.message });
    dispatch({ type: SET_LOADING, payload: false });
  }
};
export const fetchOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING, payload: true });
    const { data } = await api.viewOrder(id);

    dispatch({ type: GET_ORDER, payload: data.item });
    dispatch({ type: SET_LOADING, payload: false });
  } catch (err) {
    dispatch({ type: SET_ERROR, payload: err.message });
    dispatch({ type: SET_LOADING, payload: false });
  }
};
export const deleteOrder = (id, router) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING, payload: true });

    const { data } = await api.deleteOrder(id);

    dispatch({ type: SET_LOADING, payload: false });
    router.push("/orders");
  } catch (err) {
    dispatch({ type: SET_ERROR, payload: err.message });
    dispatch({ type: SET_LOADING, payload: false });
  }
};
