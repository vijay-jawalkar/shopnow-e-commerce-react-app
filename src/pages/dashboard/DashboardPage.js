import {useState, useEffect} from "react";
import { toast } from "react-toastify";



import { DashboardCard} from "./components/DashboardCard";
import { DashboardEmpty} from "./components/DashboardEmpty";
import { getUserOrders } from "../../services";

import { useTitle } from "../hooks/useTitle";

export const DashboardPage = () => {
  const[orders, setOrders] = useState([]);

  useTitle("Dashboard History Page");



  useEffect ( () => {
     
    async function getOrder() {

      try{
        const data = await getUserOrders();
        setOrders(data);
      }catch(error){
        toast(error.message, {closeButton : true, position: "bottom-center"});
      }
      
    

    }

    getOrder();
    console.log(orders)

}, [])
 


    return (
      <main>
        <section>
          <p className="text-2xl text-center font-semibold dark:text-slate-100 my-10 underline underline-offset-8">My Dashboard</p>
        </section>

        <section>
        {
          orders.length && ( orders.map( (order) => (
            <DashboardCard key = {order.id} order = {order} />
          )))
        }
        </section>  

        <section>
         {
          !orders.length && ( <DashboardEmpty/>)
         }
        </section>  
      </main>
    )
  }