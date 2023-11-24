import { useEffect, useState } from "react";
import img from '/Users/User/my-project/src/amazon-logo.png';
import { Link } from "react-router-dom";
import MyModal from "./MyModal";
import axios from "axios";
import Register from "./Register";
import { jwtDecode } from "jwt-decode";
import User from "./User";

import {
   BrowserRouter as Router,
   
   useLocation
 } from "react-router-dom";
 import React from "react";
import { useSelector } from "react-redux";

 
const Item = () => {
  const token=useSelector(state=>state.token.token)
 
  const decoded = token ? jwtDecode(token.jwt) : null;
  
 
   function useQuery() {
      const { search } = useLocation();
    
      return React.useMemo(() => new URLSearchParams(search), [search]);
    }
   



    let query = useQuery();
  const [data, setData] = useState([]);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchBrand, setSearchBrand] = useState("");

  useEffect(() => {
    axios
      .get('https://digitalinstitute-amazon.azurewebsites.net/api/product/products')
      .then((result) => setData(result.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="flex justify-between items-center bg-[rgb(35,47,63)] h-[70px] px-4">
      <Link to={"/"}>
        <img src={img} className="w-[120px] h-[70px]" alt="Amazon Logo" />
      </Link>
      <div className="flex items-center">
       <select
  className="h-[40px] bg-[lightgrey] rounded-l-lg text-[black] px-2 w-[200px]"
  value={searchCategory}
  onChange={(e) => setSearchCategory(e.target.value)}
>
  <option value="" disabled hidden>
    Select Category
  </option>
  {data.map((item, index) => (
    <option value={item.name} key={index}>
      {item.name}
    </option>
  ))}
</select>
        <input
          placeholder="Search Amazon"
          type="text"
          className="h-[40px] flex-1 pl-4"
          value={searchBrand}
          onChange={(e) => setSearchBrand(e.target.value)}
        />
        <Link to={`/filter?/BrandName=${searchCategory}&CategoryId=/${searchBrand}`}>
          <button className="bg-[rgb(255,153,0)] h-[40px] w-[70px] rounded-r-lg">
            Go
          </button>
        </Link>
        {decoded ? (
          <Link to={'/User'}><span className="text-white"><p className="ml-[40px]">Hello, {decoded.unique_name}</p></span></Link>
        ) : (
          <Link to={'/User'} className="text-white">
           <p className="ml-[40px]"> User</p>
          </Link>
        )}
      </div>
      <div className="flex items-center space-x-6">
        <MyModal />
        <Register/>
        <select className="bg-[rgb(35,47,63)] text-white">
          <option>EN</option>
          <option>RU</option>
          <option>GE</option>
        </select>
        <Link to="/Cart" className="text-white">
          Cart
        </Link>
      </div>
    </div>
  );
};

export default Item;
