// import data from "../../../../data/db.json";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { ProductCard } from "../../../components";
import { getFeaturedList } from "../../../services";

export const FeaturedProducts = () => {
  // const { products } = data.featured_products;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {

      try{
        const data = await getFeaturedList();
        setProducts(data);
      }catch(error){
        toast(error.message, {closeButton : true, position: "bottom-center"});
      }
     
    }
    fetchProducts();
  }, []);

  return (
    <section className="my-20">
      <h1 className="text-2xl text-center font-semibold dark:text-slate-100 mb-5 underline underline-offset-8">
        Featured Latest Products
      </h1>
      <div className="flex flex-wrap justify-center lg:flex-row">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {/* <ProductCard />
        <ProductCard />
        <ProductCard /> */}
       
      </div>
    </section>
  );
};
