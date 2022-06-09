import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { productApis } from "../../services/product-apis/index.js";
import { productsApis } from "./../../services/products-api/index";

const productActions = {
  getProducts: createAction("GET_PRODUCTS"),
  getProduct: createAction("GET_PRODUCT"),
  createProduct: createAction("CREATE_PRODUCT"),
  updateProduct: createAction("UPDATE_PRODUCT"),
  deleteProduct: createAction("DELETE_PRODUCT"),
  getProductClient: createAction("GET_PRODUCT_CLIENT"),
  addToCart: createAction("ADD_TO_CART"),
};

export const getAllProductsAction = createAsyncThunk(
  productActions.getProducts,
  async (payload) => {
    const res = await productsApis
      .products(payload)
      .then((data) => data)
      .catch((errors) => JSON.parse(errors.response.request.response));
    return res;
  }
);
export const getProductAction = createAsyncThunk(
  productActions.getProduct,
  async (id) => {
    const res = await productsApis
      .product(id)
      .then((data) => data)
      .catch((errors) => JSON.parse(errors.response.request.response));
    return res;
  }
);

export const createProductAction = createAsyncThunk(
  productActions.createProduct,
  async (payload, { rejectWithValue }) => {
    const res = await productsApis
      .createProduct(payload)
      .then((data) => data)
      .catch((errors) => JSON.parse(errors.response.request.response));
    return res;
  }
);

export const updateProductAction = createAsyncThunk(
  productActions.updateProduct,
  async (payload) => {
    const res = await productsApis
      .updateProduct(payload)
      .then((data) => data)
      .catch((errors) => JSON.parse(errors.response.request.response));
    return res;
  }
);

export const deleteProductAction = createAsyncThunk(
  productActions.deleteProduct,
  async (id) => {
    const res = await productsApis
      .deleteProduct(id)
      .then((data) => data)
      .catch((errors) => JSON.parse(errors.response.request.response));
    return res;
  }
);

export const getProductClientAction = createAsyncThunk(
  productActions.getProductClient,
  async (payload) => {
    const res = await productApis
      .productClient(payload)
      .then((data) => data)
      .catch((errors) => JSON.parse(errors.response.request.response));
    return res;
  }
);

export default productActions;
