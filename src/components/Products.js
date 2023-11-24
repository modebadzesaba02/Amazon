import { useEffect, useState } from "react";
import React, { Component } from "react";
import Slider from "react-slick";
import axios from "axios";
import Item from "./Item";
import Footer from "./Footer";
import { Link } from "react-router-dom";

import img1 from '/Users/User/my-project/src/61XO4bORHUL._AC_SL1500_.jpg';
import img2 from '/Users/User/my-project/src/download.jpg';

const Products = () => {
  const [data, SetData] = useState([]);
  const [data1, SetData1] = useState([]);
  const [data2, SetData2] = useState([]);
  useEffect(() => {
    axios.get('https://digitalinstitute-amazon.azurewebsites.net/api/product/latestproducts')
      .then(result => SetData(result.data))
      .catch(err => console.log(err))
  }, []);

  useEffect(() => {
    axios.get('https://digitalinstitute-amazon.azurewebsites.net/api/product/offers')
      .then(result => SetData1(result.data))
      .catch(err => console.log(err))
  }, []);

  useEffect(() => {
    axios.get('https://digitalinstitute-amazon.azurewebsites.net/api/product/mostdemandproducts ')
      .then(result => SetData2(result.data))
      .catch(err => console.log(err))
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1
  };

  return (
    <div className="bg-[lightgrey]">
      <Item />
      <div className="bg-[white] w-full mt-[40px] mx-auto max-w-screen-xl">
        <h2 className="text-[30px] pb-[20px] bg-[rgb(35,47,63)] mt-[30px] pt-[30px]">
          <b className="text-[white] pl-[30px]">Latest Products</b>
        </h2>
        <Slider {...settings}>
          {data.map(item =>
            <Link  key={item.id} to={`./Detail/${item.id}`}>
              <div className="pl-[20px] pb-[50px] pt-[30px] border-r-4">
                <img src={item.images} className="h-[300px] w-[auto] pr-[20px] mb-[30px]" alt={item.name} />
                <h3 className="pt-[20px]"><b>Price: </b>{item.price}$</h3>
                <p className="truncate"><b>Name: </b>{item.name}</p>
              </div>
            </Link>
          )}
        </Slider>
      </div>

      <div className="bg-[white] w-full mt-[100px] mb-[100px] mx-auto max-w-screen-xl">
        <h2 className="text-[30px] pb-[20px] bg-[rgb(35,47,63)] mt-[30px] pt-[30px]">
          <b className="text-[white] pl-[30px]">Offers</b>
        </h2>
        <Slider {...settings}>
          {data1.map(item =>
            <Link key={item.id} to={`./Detail/${item.id}`}>
              <div className="pl-[20px] pb-[50px] pt-[30px] border-r-4">
                <img src={item.image} className="h-[300px] w-[auto] pr-[20px] mb-[30px]" alt={item.name} />
                <h3><b>Old price : </b><i className="text-decoration-line: line-through">{item.oldPrice}$</i><br /><b> New Price: </b>{item.newPrice}$</h3>
                <p className="truncate"><b>Name: </b>{item.name}</p>
              </div>
            </Link>
          )}
        </Slider>
      </div>

      <div className="bg-[white] w-full mt-[100px] mb-[100px] mx-auto max-w-screen-xl">
        <h2 className="text-[30px] mt-[30px] pt-[30px] pb-[20px] bg-[rgb(35,47,63)]">
          <b className="text-[white] pl-[30px]">Most Demand Products</b>
        </h2>
        <Slider {...settings}>
          {data2.map(item =>
            <Link  key={item.id} to={`./Detail/${item.id}`}>
              <div className="pt-[40px] pl-[20px] pb-[50px] border-r-4">
                <img src={item.images} className="h-[300px] w-[auto] pr-[20px] mb-[30px]" alt={item.name} />
                <h3><b>Price: </b>{item.price}$</h3>
                <p className="truncate"><b>Name: </b>{item.name}</p>
              </div>
            </Link>
          )}
        </Slider>
      </div>
      <Footer />
    </div>
  );
}

export default Products;
