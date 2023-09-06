import { productsList } from "../pages";

export const filterReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "PRODUCT_LIST":
      return { productsList: payload.products };

    case "SORT_BY":
      return { ...state, sortBy: payload.sortBy };

    case "RATINGS":
      return { ...state, ratings: payload.ratings };

    case "CATEGORY":
      return { ...state, category: payload.category};

    case "BEST_SELLER_ONLY":
      return { ...state, bestSellerOnly: payload.bestSellerOnly };

    case "IN_STOCK_ONLY":
      return { ...state, onlyInStock: payload.onlyInStock };

    case "CLEAR_FILTER":
      return {
        ...state,
        sortBy: null,
        ratings: null,
        category: null,
        bestSellerOnly: false,
        onlyInStock: false
      };

    default:
      throw new Error("No Case Found!");
  }
};
