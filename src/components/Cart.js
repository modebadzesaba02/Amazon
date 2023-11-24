import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Item from "./Item";
import Footer from "./Footer";
import { removeItem } from "./redux/slices/CartSlice";
//quantity
const Cart = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const total = cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);

  if(cartItems.length==0){
    return(<div classname="bg-[grey]"> 
      <Item></Item>
      <div  className="max-w-[90%] mx-auto p-4 bg-[white] ">
        
        <h1 className="text-2xl font-semibold mb-4 pt-[20px]">Shopping Cart</h1>
        <h1 className="text-5xl  mb-4 pt-[40px]">Your cart is empty</h1>
      <div className="mt-4 flex justify-end">
          <div className="text-xl font-semibold">
            Total: ${total}
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button className="bg-yellow-500 text-white px-6 py-2 rounded-full hover:bg-yellow-400">
            Proceed to Checkout
          </button>
        </div>
      </div>
      
      <Footer></Footer>
    </div>)
  }

  return (
    <div>
      <Item />
      <div className="max-w-[90%] mx-auto p-4 ">
        <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
        <div className="cart-container">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex p-4 border-b border-gray-200 items-center"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-[200px] h-[200px] object-cover mr-4"
              />
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600">
                  {item.brand} {item.model}
                </p>
                <p className="text-gray-600">{item.description}</p>
              </div>
              <div className="flex-grow"></div>
              <p className="text-gray-700 font-semibold">${item.price}</p>
              <button
                className="text-red-500 ml-4"
                onClick={() => dispatch(removeItem(item.id))}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <div className="text-xl font-semibold">
            Total: ${total}
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button className="bg-yellow-500 text-white px-6 py-2 rounded-full hover:bg-yellow-400">
            Proceed to Checkout
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
