

export async function login(authdetail) {
    const requestOption = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(authdetail)
      }
  
  
     
      const response = await fetch(`${process.env.REACT_APP_HOST}/login`, requestOption);

      if(!response.ok){
        throw { message: response.statusText, status: response.status};  //eslint-disable-line
    }
      const data = await response.json();
   
  
      if(data.accessToken){
        sessionStorage.setItem("token", JSON.stringify(data.accessToken));
        sessionStorage.setItem("user_id", JSON.stringify(data.user.id));
      }

      return data;
  
}



export async function register(authDetail) {

    const requestOption = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(authDetail)
      }
  
      // "http://localhost:3004/register"
      const response = await fetch(`${process.env.REACT_APP_HOST}/register`, requestOption)

      if(!response.ok){
        throw { message: response.statusText, status: response.status};  //eslint-disable-line
    }
  
      const data = await response.json();

      return data;
}


export function logout(){
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user_id");
}