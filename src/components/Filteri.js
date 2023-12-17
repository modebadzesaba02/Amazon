import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Item from "./Item";
import Footer from "./Footer";

const Filter = () => {
  const [data, setData] = useState([]);
  const [pricefrom, setPricefrom] = useState();
  const [priceto, setPriceto] = useState();
  const [categoryName, setCategoryName] = useState("");
  

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("selectValue");
  const brandName = searchParams.get("brandName");

  useEffect(() => {
    axios
      .get("https://ngglobalwebapi20231210182820.azurewebsites.net/api/product/categories")
      .then((result) => {
        const category = result.data.find((item) => item.id === id);
        if (category) {
          setCategoryName(category.name);
        }
      });
  }, [id]);

  const notify = () => toast("Write correct price");

  useEffect(() => {
    axios
      .get(`https://ngglobalwebapi20231210182820.azurewebsites.net/api/product/products`, {
        params: {
          CategoryId: id,
          priceFrom: pricefrom >= 500000 ? notify() : pricefrom,
          priceTo: priceto >= 50000 ? notify() : priceto,
          brandName: brandName,
        },
      })
      .then((result) => setData(result.data));
  }, [id, pricefrom, priceto, brandName]);

  return (
    <div>
      <Item></Item>
    <div className="flex justify-between bg-grey-400 min-h-[100vh] items-start">
      <div className="flex  min-w-[140px]   justify-between flex-col gap-6 mt-3 ml-8">
        <div className="flex w-44 items-start gap-4">
          <p className="text-lg">
            Category:
            <span className="font-semibold text-xl">
              {" "}
              {categoryName === "" ? "All" : categoryName}
            </span>
          </p>
        </div>
        <p className="text-lg">
          price from: <br></br>
          <input
            value={pricefrom}
            type="number"
            placeholder="$"
            onChange={(e) => setPricefrom(e.target.value)}
            className="w-36 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none rounded-lg border border-amber-400"
          ></input>
        </p>
        <p className="text-lg">
          price to:<br></br>
          <input
            value={priceto}
            placeholder="$"
            type="number"
            onChange={(e) => setPriceto(e.target.value)}
            className="w-36 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none  rounded-lg border border-amber-400"
          ></input>
        </p>
      </div>
      <div className="flex flex-wrap  justify-center mt-3 gap-8">
        {data.map((item) => (
          <Link key={item.id} to={`/Details/${item.id}`}>
            <div className="p-4 border bg-gray-100 border-gray-300 w-64 rounded-lg shadow-md ">
              <img
                src={`${item.images}`}
                alt="no image"
                className="w-full object-cover  h-[310px] rounded-lg  "
              ></img>
              <p className="mt-2 text-lg font-semibold text-blue-950">
                <span className="text-xs align-text-top">$</span>
                {item.price}
              </p>
              <p className="truncate">{item.name}</p>
            </div>
          </Link>
        ))}
      </div>
      <p> </p>
    </div>
    <Footer></Footer>
    </div>
  );
};




export default Filter;
