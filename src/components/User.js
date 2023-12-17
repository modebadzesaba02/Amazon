import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import axios from "axios";
import Item from "./Item";
import Footer from "./Footer";

const User = () => {
  const token = useSelector((state) => state.token.token);
  const decodedToken = token ? jwtDecode(token.jwt) : null;
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [newEmail, setNewEmail] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    let isMounted = true;

    if (decodedToken && decodedToken.email) {
      axios
        .post(
          `https://ngglobalwebapi20231210182820.azurewebsites.net/api/user/getByEmail`,
          { email: decodedToken.email }
        )
        .then((result) => {
          if (isMounted) {
            setData(result.data);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setLoading(false);
        });
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const handleUpdateUser = () => {
    axios
      .put(
        `https://ngglobalwebapi20231210182820.azurewebsites.net/api/User/updateuserdata`,
        {
         'id':data[0].id,
          'userName':newUsername==data[0].userName?data[0].userName:newUsername,
          'email':newEmail==data[0].email?data[0].email:newEmail,
          'newPassword':newPassword==data[0].password?data[0].password:newPassword

        }
      )
      .then((result) => {
        console.log("User data updated successfully:", result.data);
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
      });
  };

  return (
    <div>
      <Item />
      <div className="flex justify-center bg-[url('https://images.freeimages.com/clg/istock/previews/8875/88753839-seamless-shopping-cart-colorfull-pattern-background.jpg')]  pb-14 bg-contain bg">
        <div className="flex flex-col  shadow-lg rounded-lg  w-[420px]  pl-[10px]  p-10 mb-2 bg-white mt-10">
          <div className="flex flex-col gap-3 pb-2">
            <div className="flex justify-between items-center">
              <h1 className="mb-7 text-3xl font-semibold text-center">User Info</h1>
              <img
                src="https://icon-library.com/images/user-512_10381.png"
                className="w-24"
                alt="User Avatar"
              />
            </div>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="flex flex-col gap-3 pb-2">
                {console.log(data[0])}
                <p>User name: {data[0]?.userName}</p>
                <p>Email: {data[0]?.email}</p>
                
              </div>
            )}
          </div>
          <div className="flex flex-col  gap-3">
            <input
              className="border h-9 border-gray-500 focus:outline-none rounded-sm w-[400px] mt-1"
              placeholder="New Email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            ></input>
            <input
              className="border h-9 border-gray-500 focus:outline-none rounded-sm w-[400px] mt-1"
              placeholder="New Username"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            ></input>
            <input
              className="border h-9 border-gray-500 focus:outline-none rounded-sm w-[400px] mt-1"
              placeholder="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            ></input>
            <button
              onClick={handleUpdateUser}
              className="inline-flex w-[400px] justify-center rounded-md border border-transparent bg-[#FFD814] px-4 py-2 text-sm font-medium text-gray-800 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              Update User Data
            </button>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default User;
