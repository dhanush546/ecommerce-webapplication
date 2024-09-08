import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { userLoginContext } from "../../contexts/userLoginContext";
import { MdDeleteOutline } from "react-icons/md";
import "./Cart.css";


function Cart() {
  let { currentUser } = useContext(userLoginContext);
  let [cart,setCart]=useState([]);

  //get latest cart
  async function getUserCart(){
    let res=await fetch(`http://localhost:4000/user-api/cart/${currentUser.username}`)
    let data=await res.json();
    setCart(data.payload.products)
  }

  useEffect(()=>{
    getUserCart()
  },[])
  //get products from cart by username
  // async function getProductsOfUserCart() {
  //   let res = await fetch(
  //     `http://localhost:3000/user-cart?username=${currentUser.username}`
  //   );

  //   let cartItemsList = await res.json();
  //   setCartItems(cartItemsList);
  // }

  //delete product from cart
  async function deleteProduct(productId) {
    let username=currentUser.username
    let res = await fetch(`http://localhost:4000/user-api/delete-from-cart/${username}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body:JSON.stringify(productId)
    });
    
    let result= await res.json();
    
  }

  // useEffect(()=>{
  //   getUserCart()
  // },[])

//  useEffect(() => {
//    getProductsOfUserCart();
//    }, []);  

  return (
    <div>
      {currentUser.products.length === 0 ? (
        <p className="display-1 text-center text-danger">Cart is empty</p>
      ) : (
        <table className="table text-center">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Price</th>
              <th>Brand</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((cartItem) => (
              <tr key={cartItem.id}>
                <td>{cartItem.id}</td>
                <td>{cartItem.title}</td>
                <td>{cartItem.price}</td>
                <td>{cartItem.brand}</td>
                <button
                  className="btn"
                  onClick={() => deleteProduct(cartItem.id)}
                >
                  <MdDeleteOutline className="text-danger fs-3" />
                </button>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Cart;