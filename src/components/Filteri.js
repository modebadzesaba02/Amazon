import React from "react";
import Item from "./Item";
import Footer from "./Footer";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";


const Filteri = () => {
  const [priceone, setPriceone] = useState();
  const [pricetwo, setPricetwo] = useState();
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("https://amazon-digital-prod.azurewebsites.net/api/product/products", {
        params: {
          priceFrom: priceone,
          priceTo: pricetwo,
         
        },
      })
      .then((result) => setData(result.data))
      .catch((err) => console.log(err));
  }, []);

  
  

  return (
    <div className="">
      <Item />
      <div className="flex justify-between mb-8">
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Price from"
            className="w-32 px-2 py-1 border rounded"
            value={priceone}
            onChange={(e) => setPriceone(e.target.value)}
          />
          <input
            type="text"
            placeholder="Price to"
            className="w-32 px-2 py-1 border rounded"
            value={pricetwo}
            onChange={(e) => setPricetwo(e.target.value)}
          />
          <button
            className="bg-yellow-500 text-white px-4 py-2 rounded"
            onClick={() => {
            }}
          >
            Go
          </button>
        </div>
        <div className="text-right">
         
       
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {data.map((item) => (
          <div
            key={item.id}
            className="border p-4 rounded shadow-md transition-transform transform hover:scale-105"
          >
            <img src={item.images} alt={item.name} className="w-full h-auto" />
            <p className="text-lg font-semibold my-2">{item.name}</p>
            <p className="text-yellow-600 text-xl">{item.price}</p>
            <button
              className="bg-yellow-500 text-white px-4 py-2 rounded mt-2 hover:bg-yellow-400"
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Filteri;
