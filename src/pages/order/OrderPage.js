import { Success } from "./components/Success"
import { Fail } from "./components/Fail"
import { useLocation } from "react-router-dom"

export const OrderPage = () => {
    const {state} = useLocation();
    return (
      <div>
        {
            state.status ? <Success data = {state.data}/> : <Fail/>
        }
      </div>
    )
  }