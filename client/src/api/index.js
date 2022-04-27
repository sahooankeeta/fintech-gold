import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_BASE_URL });

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
export const fetchAll = (item, gram) =>
  API.get(`/item/${item}${gram ? `?gram=${gram}` : ""}`);
export const addItem = (formData) => API.post("/item", formData);
export const deleteItem = (id) => API.delete(`/item/${id}`);
export const updateItem = (formData) => API.patch("/item", formData);
export const fetchProduct = (id) => API.get(`/item/view/${id}`);
export const addCart = (data) => API.post("/cart", data);
export const removeCart = (user, id) => API.delete(`/cart/${user}/${id}`);
export const updateCartItem = (user, product, type) =>
  API.patch(`/cart/${user}/${product}/${type}`);
export const emptyCart = (user) => API.get(`/cart/empty/${user}`);
export const addOrder = (data) => API.post("/order", data);
export const fetchOrders = (user) => API.get(`/order/all/${user}`);
export const viewOrder = (id) => API.get(`/order/${id}`);
export const deleteOrder = (id) => API.delete(`/order/${id}`);
