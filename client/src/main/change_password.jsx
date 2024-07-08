//libs..
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

//components..
import Button from "../components/button.jsx";
import SuccessAlert from "../components/alert/success.jsx";

//icon
import { FaRocketchat } from "react-icons/fa6";

export default function ChangePassword(){

    //vars..
    const navigate = useNavigate();
    const location =  useLocation();

    //verificar se ele tem dados necessários para entrar na página..
    useEffect(() => {

        if (!location.state?.id_user || !location.state?.type || !location.state?.token) {
            
            navigate('/');

        }else if (location.state.type !== "controller/tokenController/forgetPassword"){

            navigate('/');

        }

    })

    //state vars..
    const [stateBtnContent, setBtnContent] = useState("Send");
    const [stateBtnStatus, setBtnStatus] = useState(true);

    const fetchChangePassword = async () => {

        const password = document.getElementById('inpassword');
        const confirm_password = document.getElementById('inconfirmpassword');

        try {
            
            if (password.value !== password.value) {

                confirm_password.classList.add('border-red-400');
                document.querySelector("#error_confirm_password").innerText = "Confirm password is invalid.";

            }else{

                setBtnContent("Loading...");
                setBtnStatus(false);

                const response = await fetch('http://localhost:8005/user/change-password', {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    mode: "cors",
                    body: JSON.stringify(
                        {
                            "id_user": location.state.id_user,
                            "type": location.state.type,
                            "token": location.state.token,
                            "password": password.value
                        }
                    )
                });
        
                const data = await response.json();
                
                password.classList.remove('border-red-400');
                confirm_password.classList.remove('border-red-400');
                document.querySelector("#error_password").innerText = "";
                document.querySelector("#error_confirm_password").innerText = "";
                document.querySelector('#error').innerHTML = "";
    
                if (data.status == false) {
                    
                    if (data.missing) {
                        
                        data.missing.forEach(element => {
                            
                            switch (element) {
    
                                case 'password':
                                    
                                    password.classList.add('border-red-400');
                                    confirm_password.classList.add('border-red-400');
                                    document.querySelector('#error').innerHTML = "Password is required.";
        
                                    break;
                            
                                default:
        
                                    console.error("Name of shields don't match.");
        
                                    break;
                            }
    
                        });
    
    
    
                    }else{
    
                        document.querySelector('#error').innerHTML = data.text;
    
                    }
    
                }else{
    
                    navigate("/sign-in", {state: {password_changed: true}});

    
                }
    
                setBtnContent("Send");
                setBtnStatus(true);

            }

        } catch (error) {
            
            console.error('Error loging user:', error);

        }

    }

    return (
        <div className="w-full max-w-sm mx-auto overflow-hidden   ">

            <div className="px-6 py-4 bg-white rounded-t-[16px]">

                <div className="flex justify-center mb-5 mx-auto">
                    <a className="cursor-pointer mx-2 text-sm font-bold text-blue-500 hover:underline" onClick={() => { navigate("/"); }} >
                        <FaRocketchat size={50} color="#3b82f6" title="metablog"/>
                    </a>
                </div>

                <p className="mt-1 text-center text-gray-500">Type the new password you'd like to use and cofirm it on the "Confirm Password" shield.</p>

                <form>

                    <div className="w-full mt-4">
                        <input
                            className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                            type="password"
                            placeholder="New Password"
                            id='inpassword'
                        />
                        <small id="error_password" className="font-bold text-[#f01313]"></small>
                    </div>

                    <div className="w-full mt-4">
                        <input
                            className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                            type="password"
                            placeholder="Confirm New Password"
                            id='inconfirmpassword'
                        />
                        <small id="error_confirm_password" className="font-bold text-[#f01313]"></small>
                    </div>

                    <p id="error" className="font-bold text-[#f01313] mt-4 text-center"></p>

                    <div className="flex items-center justify-center mt-4">
                        
                        <Button activate={stateBtnStatus} bg_color="#3b82f6" hover_bg_color="#4f65ff" font_color="white" content={stateBtnContent} txtsize="16px" type="submit" onClick={fetchChangePassword} />

                    </div>
                </form>
            </div>

        </div>
    )

}