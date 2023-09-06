import { Link } from "react-router-dom" ;
import { OrderPage } from "../OrderPage";
import { useTitle } from "../../hooks/useTitle";


export const Success = ({data}) => {
    useTitle("Order Successfull");
    return (
      <section className="text-xl text-center max-w-4xl mx-auto my-10 py-5 dark:text-slate-100 border dark:border-slate-700 rounded">
          <div className="my-5">
              <p className="bi bi-check-circle text-green-600 text-7xl mb-5"></p>
              <p>Thank you {data.user.name} for order!</p>
              <p>Your Order ID: {data.id}</p>          
          </div>
          <div className="my-5">
              <p>Your order is confirmed.</p>
              <p>Please check your mail ({data.user.email}) for the Order Details.</p>
              <p className="my-5">Payment ID: {`xyz_ ${ Math.floor((Math.random() * 1000000000) + 100000000)}`} </p>
          </div>
          <Link to="/products" type="button" className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none">Continue Shopping <i className="ml-2 bi bi-cart"></i></Link>
      </section>
    )
  }