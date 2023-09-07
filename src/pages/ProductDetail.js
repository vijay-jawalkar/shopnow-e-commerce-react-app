import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useCart } from "../context";
import { Rating } from "../components/elements/Rating";
import { getProduct } from "../services";
import { useTitle } from "./hooks/useTitle";
import { toast } from "react-toastify";


export const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const [inCart, setInCart] = useState(false);
   const{cartList, addToCart, removeFromCart} = useCart();
  const { id } = useParams();
  console.log(id);

 

  useEffect(() => {
    async function fetchProducts() {

      try{
        const data = await getProduct(id);
        setProduct(data);
      }catch(error){
        toast(error.message, {closeButton : true, position: "bottom-center"});
      }
      
    }
    fetchProducts();
  }, [id]);

  useEffect( () => {

    const productInCart = cartList.find( item => item.id === product.id);

    if(productInCart){
        setInCart(true);
    }else{
        setInCart(false);
    }

}, [cartList, product.id])

function handleAddToCart(product){
  addToCart(product);
 
}

function handleRemoveCart(product) {
  removeFromCart(product);
}

useTitle(product.name);

  return (
    <main>
      <section>
        <h1 className="mt-10 mb-5 text-4xl text-center font-bold text-gray-900 dark:text-slate-200">
          {/* The Complete Guide to Backend Development */}

          {product.name}
        </h1>
        <p className="mb-5 text-lg text-center text-gray-900 dark:text-slate-200">
          {product.overview}
        </p>
        <div className="flex flex-wrap justify-around">
          <div className="max-w-md my-3">
            <img className="rounded" src={product.image_local} alt={product.name} />
          </div>
          <div className="max-w-xl my-3">
            <p className="text-3xl font-bold text-gray-900 dark:text-slate-200">
              <span className="mr-1">₹</span>
              <span className=""> {product.price}</span>
            </p>
            <p className="my-3">
            <Rating rating={product.rating} />
            </p>
            <p className="my-4 select-none">
              {product.best_seller && (
              <span className="font-semibold text-amber-500 border bg-amber-50 rounded-lg px-3 py-1 mr-2">
                Best Seller
              </span>
              )}
           

               {
                product.in_stock ? (  <span className="font-semibold text-emerald-600	border bg-slate-100 rounded-lg px-3 py-1 mr-2">
                In Stock
              </span>)  : (<span className="font-semibold text-red-600	border bg-slate-100 rounded-lg px-3 py-1 mr-2">
                Out Of Stock
              </span>)
               }
            
              {/* <span className="font-semibold text-rose-700 border bg-slate-100 rounded-lg px-3 py-1 mr-2">OUT OF STOCK</span> */}
              <span className="font-semibold text-blue-500 border bg-slate-100 rounded-lg px-3 py-1 mr-2">
             {product.category}
              </span>
            </p>
            <p className="my-3">
              {/* <button
                className={`inline-flex items-center py-2 px-5 text-lg font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800`}
              >
                Add To Cart <i className="ml-1 bi bi-plus-lg"></i>
              </button> */}


           {

           inCart ?
           <button
           onClick ={ () => handleRemoveCart(product)}
           className={`inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 ${product.in_stock ? "" : "cursor-not-allowed"}`} disabled={ product.in_stock ? "" : "disabled" }>Remove Item <i className="ml-1 bi bi-trash3"></i></button> 
           :

          <  button 
         onClick ={ () => handleAddToCart(product)}
         className={`inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 ${product.in_stock ? "" : "cursor-not-allowed"} `} disabled={ product.in_stock ? "" : "disabled" }>
          Add To Cart <i className="ml-1 bi bi-plus-lg"></i>
         </button>
        }


              {/* <button className={`inline-flex items-center py-2 px-5 text-lg font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800`}  disabled={ product.in_stock ? "" : "disabled" }>Remove Item <i className="ml-1 bi bi-trash3"></i></button> */}
            </p>
            <p className="text-lg text-gray-900 dark:text-slate-200">
              {product.long_description}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};
