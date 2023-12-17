import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { addItem } from './redux/slices/CartSlice';
import axios from 'axios';
import Item from './Item';
import Footer from './Footer';

const Detail = () => {


  const { id } = useParams();

  const [data, setData] = useState('');

  const dispatch = useDispatch();
  const addToCart = () => {
    dispatch(addItem(data))
  }

  useEffect(() => {
    axios
      .get(`https://ngglobalwebapi20231210182820.azurewebsites.net/api/product/products/${id}`,
       
      )
      .then((result) => setData(result.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div> <Item />
      <div className="flex justify-center items-center min-h-screen bg-gray-100 pt-[25px]">

        <div className="bg-white p-[29px] rounded-lg shadow-md w-[1200px]">

          <img src={data.image} alt={data.name} className="w-[350px] h-auto mx-auto" />
          <h2 className="text-2xl font-semibold mt-4">{data.name}</h2>
          <p className="text-gray-600">{data.brand} {data.model}</p>
          <p className="text-lg text-red-500 mt-2">${data.price}</p>
          <p className="mt-4">{data.description}</p>
          <div className="flex justify-center mt-4">
            <button onClick={addToCart} className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600">

              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Detail;
