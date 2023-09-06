

export async function getUser(){

      const token = JSON.parse(sessionStorage.getItem("token"));
      const user_id = JSON.parse(sessionStorage.getItem("user_id"));


      const requestOption = {
        method: "GET",
        headers: {"Content-Type": "application/json", Authorization: `Bearer: ${token}`}

    }

      const response = await fetch(`${process.env.REACT_APP_HOST}/users/${user_id}`, requestOption)

      if(!response.ok){
        throw { message: response.statusText, status: response.status}  //eslint-disable-line
    }
      const data = await response.json();

      return data;

}



export async function getUserOrders(){

    const token = JSON.parse(sessionStorage.getItem("token"));
    const user_id = JSON.parse(sessionStorage.getItem("user_id"));

    const requestOption = {
      
        method: "GET",
        headers: {"Content-Type": "application/json", Authorization: `Bearer: ${token}`}
    }

      const response = await fetch(`${process.env.REACT_APP_HOST}/orders/?user.id=${user_id}`, requestOption)

      if(!response.ok){
        throw { message: response.statusText, status: response.status}    //eslint-disable-line
    }
      const data = await response.json();

      return data;

    
}

export async function createOrder(cartList, total, user){

    const token = JSON.parse(sessionStorage.getItem("token"));

    const order = {
        cartList: cartList,
        amount_paid: total,
        quantity: cartList.length,
        user: {
            name: user.name,
            email: user.email,
            id: user.id
        }

    }

    const requestOption = {
        method: "POST",
        headers: {"Content-Type": "application/json", Authorization: `Bearer : ${token}`},
        body: JSON.stringify(order)

    }


    const response = await fetch( `${process.env.REACT_APP_HOST}/orders`, requestOption)

    if(!response.ok){
        throw { message: response.statusText, status: response.status}   //eslint-disable-line
    }
    const data = await response.json();

    return data;
    
}