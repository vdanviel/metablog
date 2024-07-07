import { FaRocketchat } from "react-icons/fa6";
import { useState } from "react";
import Modal from "../../components/modal.jsx";

export default function Navbar(){

  const [stateToggle, setToggle] = useState(false);

  const sendToMain = () => {

    return window.location = window.location.origin + "/feed";

  }

  const openMenu = () => {

    setToggle(true);

  }

  const closeMenu = () => {

    setToggle(false);

  }

  const logOut = () => {

    localStorage.clear();

    window.location = window.location.origin;

  }

  const modal_mobile_content = (
    <div className="min-w-[200px]">
        <div>
          <a href="/profile" className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"> Your Profile </a>
          <a href="/about" className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"> Info </a>
          <a onClick={logOut} className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"> Sign Out </a>
        </div>
    </div>
  )

  return (
    <div>

      <Modal onOpen={stateToggle} onClose={closeMenu} title="Options" content={modal_mobile_content} />

      <nav className='absolute inset-x-0 top-0 h-16 px-3 pt-3'>
        <div className="flex justify-between items-center">

          <a onClick={sendToMain} className="cursor-pointer text-sm font-bold text-blue-500 hover:underline" >
            <FaRocketchat size={50} color="#3b82f6" title="metablog"/>
          </a>

          <button id="mobile_menu_icon" className="lg:hidden" onClick={openMenu}>
            <svg height="32px" width="32px" version="1.1" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" ><path d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"/></svg>
          </button>

          <div className="hidden lg:flex space-x-4">
            <a className="font-bold" href="/profile">Profile</a>
            <a className="font-bold" href="/about">Info</a>
            <a className="font-bold cursor-pointer" onClick={logOut}>Sign Out</a>
          </div>

        </div>
      </nav>
    </div>

  );

}
