import React, { useEffect, useState } from "react";
import img from '/Users/User/my-project/src/amazon-logo.png';
import { Link } from "react-router-dom";
import MyModal from "./MyModal";
import axios from "axios";
import Register from "./Register";
import { jwtDecode } from "jwt-decode";
import User from "./User";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import '../Item.css'; // Import your CSS file

const Item = () => {
  const token = useSelector(state => state.token.token);
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
      .get('https://ngglobalwebapi20231210182820.azurewebsites.net/api/product/products')
      .then((result) => setData(result.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="header-container">
      <Link to={"/"}>
        <img src={img} className="logo" alt="Amazon Logo" />
      </Link>
      <div className="search-container">
        <select
          className="category-select"
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
        >
          <option value="" disabled hidden>
            Select Category
          </option>
          {data.map((item, index) => (
            <option className="truncate" value={item.name} key={index}>
              {item.name}
            </option>
          ))}
        </select>
        <input
          placeholder="Search Amazon"
          type="text"
          className="search-input"
          value={searchBrand}
          onChange={(e) => setSearchBrand(e.target.value)}
        />
        <Link to={`/filter?/BrandName=${searchCategory}&CategoryId=/${searchBrand}`}>
          <button className="search-button">
            Go
          </button>
        </Link>
        {decoded ? (
          <Link to={'/User'}>
            <span className="user-greeting">Hello, {decoded.unique_name}</span>
          </Link>
        ) : (
          <Link to={'/User'} className="user-greeting">
            User
          </Link>
        )}
      </div>
      <div className="nav-container">
        <div className="reg">
        <MyModal />
        <Register/>
        </div>
        <div className="dal">
        <select className="language-select">
          <option>EN</option>
          <option>RU</option>
          <option>GE</option>
        </select>
        <Link to="/Cart" className="cart-link">
          Cart
        </Link>
        </div>
      </div>
    </div>
  );
};

export default Item;
