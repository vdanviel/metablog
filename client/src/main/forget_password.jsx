//libs..
import { useState } from "react";
import { useNavigate } from "react-router-dom";

//components..
import Button from "../components/button.jsx";

//icon
import { FaRocketchat } from "react-icons/fa6";

export default function ForgetPassword(){

    //vars..

    const navigate = useNavigate();

    //state vars..
    const [stateBtnContent, setBtnContent] = useState("Send");
    const [stateBtnStatus, setBtnStatus] = useState(true);


    const fetchForgetPassword = async () => {

        const email = document.getElementById('inemail');

        setBtnContent("Loading...");
        setBtnStatus(false);

        try {
        
            const response = await fetch('http://localhost:8005/token/forget-password', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                mode: "cors",
                body: JSON.stringify(
                    {
                        "email": email.value
                    }
                )
            });
    
            const data = await response.json();
            
            email.classList.remove('border-red-400');
            document.querySelector("#error_email").innerText = "";
            document.querySelector('#error').innerHTML = "";

            if (data.status == false) {
                
                if (data.missing) {
                    
                    data.missing.forEach(element => {
                        
                        switch (element) {

                            case 'email':
                                
                                email.classList.add('border-red-400');
                                document.querySelector("#error_email").innerText = "Email is required.";
    
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

                navigate("/verify/forget-password", {state: {email: email.value}});

            }

            setBtnContent("Send");
            setBtnStatus(true);

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

                <p className="mt-1 text-center text-gray-500">Type your email account. We're going to send a message to you with a 5 caracters token. In the next page you're going to use it.</p>

                <form>
                    <div className="w-full mt-4">
                        <input
                            className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                            type="email"
                            placeholder="Email Address"
                            id='inemail'
                        />
                        <small id="error_email" className="font-bold text-[#f01313]"></small>
                    </div>

                    <p id="error" className="font-bold text-[#f01313] mt-4 text-center"></p>

                    <div className="flex items-center justify-center mt-4">
                        
                        <Button activate={stateBtnStatus} bg_color="#3b82f6" hover_bg_color="#4f65ff" font_color="white" content={stateBtnContent} txtsize="16px" type="submit" onClick={fetchForgetPassword} />

                    </div>
                </form>
            </div>

        </div>
    )

}