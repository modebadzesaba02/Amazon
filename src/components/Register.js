import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import axios from 'axios';

export default function Register() {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  
  const [isOpen, setIsOpen] = useState(false);
  const [signIn, setSignIn] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  }

  const closeModalWithNotify = () => {
    
    axios.post('https://ngglobalwebapi20231210182820.azurewebsites.net/api/user/registerUser', {
      "userName": userName,
      "password": password,
      "email": email
    })
    .then((response) => {
      console.log('Response:', response.data);
      setSignIn(true); 
      closeModal(); 
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  function openModal() {
    setIsOpen(true);
  }

  
  return (
    <>
      <div>
        <button
          type="button"
          onClick={openModal}
          className='text-[white]'
        >
          Sign up
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
               <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
      <div className="flex justify-between items-center">
        <Dialog.Title
          as="h3"
          className="text-3xl font-medium leading-6 text-gray-900"
        >
          Register
        </Dialog.Title>
        <img alt='altertantive'
          className="w-28"
          src="https://www.themobileindian.com/wp-content/uploads/2021/06/amazon-india-a.jpg"
        ></img>
      </div>
      <p className=" text-md mt-4 font-bold text-gray-800">
        Create a new account
      </p>
      <p className=" text-xs mt-4 font-bold text-gray-800">Email</p>
      <input
        className="border h-9 border-gray-500 focus:outline-none rounded-sm w-[400px] mt-1"
        placeholder="Enter your email "
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <p className=" text-xs mt-4 font-bold text-gray-800">User Name</p>
      <input
        className="border h-9 border-gray-500 focus:outline-none rounded-sm w-[400px] mt-1"
        placeholder="Enter your User Name "
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      ></input>
      <p className=" text-xs mt-4 font-bold text-gray-800">Password</p>
      <input
        className="border h-9 border-gray-500 focus:outline-none rounded-sm w-[400px] mt-1"
        placeholder="Enter your Password "
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <div className="mt-4">
        <button
          type="button"
          className="inline-flex w-[400px] justify-center rounded-md border border-transparent bg-[#FFD814] px-4 py-2 text-sm font-medium text-gray-800 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          onClick={closeModalWithNotify}
        >
          Register
        </button>
      </div>
      <div className="text-sm flex flex-col gap-10 pt-7">
        <p>
          By registering, you agree to Amazon's
          <a href="#" className="text-blue-400">
            Terms of Service
          </a>
          and{" "}
          <a href="#" className="text-blue-400">
            Privacy Policy.
          </a>
        </p>
        <button
          className="text-blue-400 text-left w-28"
          onClick={() => setSignIn(true)}
        >
          Sign In
        </button>
        <a href="#" className="text-blue-400">
          Need help?
        </a>
      </div>
    </Dialog.Panel>
              </Transition.Child>
            </div>
            </div>
        </Dialog>
      </Transition>
    </>
  )
}

