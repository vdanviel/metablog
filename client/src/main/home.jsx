import { useNavigate } from "react-router-dom";
import { useState } from "react";

//icones..
import { IoAddCircleOutline } from "react-icons/io5";
import { LuDoorOpen } from "react-icons/lu";
import { FaRocketchat } from "react-icons/fa6";

//components I use here..
import Button from "./../components/button.jsx";
import Modal from "./../components/modal.jsx";

export default function Home() {

    const navigate = useNavigate();

    const signup = () => {

      navigate('/sign-up');
    
    }

    const signin = () => {

      navigate('/sign-in');
    
    }

    const [opened, setOpened] = useState(false);

    const openModal = () => {
      setOpened(true)
    }

    const closeModal = () => {
      setOpened(false)
    }

    const modal_html = (
      
      <div>

        <div className="flex flex-row items-center lg:space-x-4">

          <button onClick={signin} className="flex flex-col items-center lg:items-center">

            <div className="flex justify-center flex-col items-center rounded-lg p-4  hover:shadow-lg transition-shadow">
              
              <LuDoorOpen color="#3b82f6" size={65} />

              <span className="text-center font-bold text-[#3b82f6]">Sign In</span>

            </div>

          </button>

          <button onClick={signup} className="flex flex-col items-center  lg:flex-row lg:items-center">
            <div className="flex justify-center flex-col items-center rounded-lg p-4 hover:shadow-lg  transition-shadow">
              
              <IoAddCircleOutline color="#3b82f6" size={65} />

              <span className="text-center font-bold text-[#3b82f6]">Sign Up</span>

            </div>

          </button>

        </div>

      </div>

    );

     // Define size based on window width
     const iconSize = window.innerWidth > 600 ? 75 : 65; // Example logic

    const html = (

      <div className="flex justify-center items-center flex-col">
        
        <Modal onOpen={opened} onClose={closeModal} title={"I want to:"} content={modal_html} />

          <a href="https://vdanviel.github.io/" target="_blank" className="flex lg:text-[20px] font-bold	items-center gap-2">
            made by <img className="w-[100px] lg:w-[200px]" src="https://vdanviel.github.io/img/logo.png"/> vdanviel
          </a>

          <p className="pt-2 text-center mx-[20px]">This platform is a mini social midia made by myself. It uses <i>React</i> and <i>Node.js/Express.js</i>. Wow awesome.</p>

          <div className="flex gap-2 mt-4">

              <img width="24" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" alt="react"/>
              <img width="24" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" alt="nodejs"/>
              <img width="24" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg" alt="expressjs"/>
              <img width="24" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" alt="mongo"/>

          </div>

          <div className="flex justify-center items-center flex-col text-center lg:text-[25px] rounded-[16px] bg-white p-5 m-5">
            <p>Welcome to</p>

            <div className="flex items-center flex-col m-1">
              <FaRocketchat size={iconSize} color="#3b82f6" title="metablog"/>
              <p className="font-bold text-[#4f65ff]">metablog</p>
            </div>
      
            <p>Here you can post anything you think!</p>
          </div>
          
          <Button className="lg:text-[20px]" activate={true} bg_color="#3b82f6" hover_bg_color="#4f65ff" font_color="white" content="Let's Begin" type="submit" onClick={openModal}/>
    
      </div>
    
    )

    return html;
}