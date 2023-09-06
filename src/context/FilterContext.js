import { createContext, useContext, useReducer } from "react";
import { filterReducer } from "../reducer/filterReducer";
const FilterInitialState = {
  productsList: [],
  sortBy: null,
  ratings: null,
  category: null,
  bestSellerOnly: false,
  onlyInStock: false
};

const FilterContext = createContext(FilterInitialState);

export const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(filterReducer, FilterInitialState);

  function initialProductList(products) {
    dispatch({
      type: "PRODUCT_LIST",
      payload: {
        products: products
      }
    });
  }

  function inStock(products) {
    return state.onlyInStock
      ? products.filter((product) => product.in_stock === true)
      : products;
  }

  function sort(products) {
    if (state.sortBy === "lowtohigh") {
      return products.sort((a, b) => Number(a.price) - Number(b.price));
    }

    if (state.sortBy === "hightolow") {
      return products.sort((a, b) => Number(b.price) - Number(a.price));
    }

    return products;
  }

  function ratings(products) {
    if (state.ratings === "4STARSABOVE") {
      return products.filter((product) => product.rating >= 4);
    }

    if (state.ratings === "3STARSABOVE") {
      return products.filter((product) => product.rating >= 3);
    }

    if (state.ratings === "2STARSABOVE") {
      return products.filter((product) => product.rating >= 2);
    }

    if (state.ratings === "1STARSABOVE") {
      return products.filter((product) => product.rating >= 1);
    }
    return products;
  }

  function categories(products) {
   if(state.category === "mobile"){
    return products.filter( (product) => product.category === "mobile");
   }

   if(state.category === "laptop"){
    return products.filter( (product) => product.category === "laptop");
   }

   if(state.category === "headphone"){
    return products.filter( (product) => product.category === "headphone");
   }

   if(state.category === "tv"){
    return products.filter( (product) => product.category === "tv");
   }

   return products;

  }

  function bestSeller(products) {
    return state.bestSellerOnly
      ? products.filter((product) => product.best_seller === true)
      : products;
  }

  const filterProductList =  categories(  ratings(sort(inStock(bestSeller(state.productsList)))) )   ;

  const value = {
    state,
    dispatch,
    productsList: filterProductList,
    initialProductList
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  return context;
};
