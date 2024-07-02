import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from "react";

//icons..
import { FaRocketchat } from "react-icons/fa6";

//components..
import Button from "./../components/button.jsx";
import SuccessAlert from "./../components/alert/success.jsx";

export default function Login(){
    const location = useLocation();
    const email = location.state?.email || '';//esse "?" verifica se existe esse .email, se n existir ele n acessa se n vai dar problema d acesso em null..

    const navigate = useNavigate();

    const [btnContent, setBtnContent] = useState('Sign In');
    const [btnActive, setBtnActive] = useState('Sign In');

    const login_user = async (event) => {

        event.preventDefault();

        setBtnContent("Loading...");
        setBtnActive(false);

        let inemail = document.querySelector("#inemail");
        let inpassword = document.querySelector("#inpassword");

        try {

            const response = await fetch("http://localhost:8005/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: inemail.value,
                    password: inpassword.value
                })
            });
            
            const data = await response.json();

            console.log(data);

            if (data.status == false) {
              
              document.querySelector('#error').innerText = "";
              inemail.classList.remove('border-red-400');
              document.querySelector("#error_email").innerText = "";
              inpassword.classList.remove('border-red-400');
              document.querySelector("#error_password").innerText = "";

              if (data.missing) {
              
                data.missing.forEach(element => {
                  
                  switch (element) {
  
                    case 'email':
                      
                      inemail.classList.add('border-red-400');
                      document.querySelector("#error_email").innerText = "Email is required.";
  
                      break;
  
                    case 'password':
                      
                      inpassword.classList.add('border-red-400');
                      document.querySelector("#error_password").innerText = "Password is required.";
  
                      break;
                  
                    default:
                      
                      console.error("Name of shields don't match.");
  
                      break;
                  }
  
                });
  
              } else if(data.text){

                document.querySelector('#error').innerText = data.text;

              }

            }else{

                localStorage.setItem('user', data.user);

              navigate("/feed");

            }

        } catch (error) {

          console.error('Error loging user:', error);

        }

        setBtnContent("Let's Begin!");
        setBtnActive(true);

    }
        
    return(
        <div className="w-full max-w-sm mx-auto overflow-hidden   ">

            {email && <SuccessAlert title="Welcome!" text="You've been successfully registered." />}
            

            <div className="px-6 py-4 bg-white rounded-t-[16px]">

                <div className="flex justify-center mb-5 mx-auto">
                    <FaRocketchat size={50} color="#3b82f6" title="metablog"/>
                </div>

                <p className="mt-1 text-center text-gray-500">Welcome back! Login into your account.</p>

                <form>
                    <div className="w-full mt-4">
                        <input
                            className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                            type="email"
                            placeholder="Email Address"
                            id='inemail'
                            defaultValue={email}
                        />
                        <small id="error_email" className="font-bold text-[#f01313]"></small>
                    </div>

                    <div className="w-full mt-4">
                        <input
                            className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                            type="password"
                            id='inpassword'
                            placeholder="Make sure to remember it"
                        />
                        <small id="error_password" className="font-bold text-[#f01313]"></small>
                    </div>

                    <p id="error" className="font-bold text-[#f01313] mt-4"></p>

                    <div className="flex items-center justify-between mt-4">
                        <a href="#" className="text-sm text-gray-600 hover:text-gray-500">Forget Password?</a>
                        
                        <Button activate={btnActive} bg_color="#3b82f6" hover_bg_color="#4f65ff" font_color="white" content={btnContent} txtsize="16px" type="submit" onClick={login_user} />

                    </div>
                </form>
            </div>

            <div className="flex items-center justify-center py-4 text-center bg-gray-50 rounded-b-[16px]">
                <span className="text-sm text-gray-600">Don&apos;t have an account? </span>
                <a href="#" className="mx-2 text-sm font-bold text-blue-500 hover:underline">Register</a>
            </div>
        </div>
    );


}