//libs..
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

//components..
import Button from "../components/button.jsx";

//icon
import { FaRocketchat } from "react-icons/fa6";
import { MdOutlineMarkEmailRead } from "react-icons/md";

export default function VerifyForgetPassword(){

    //vars..
    const location = useLocation();
    const navigate = useNavigate();

    //state vars..
    const [stateBtnContent, setBtnContent] = useState("Send");
    const [stateBtnStatus, setBtnStatus] = useState(true);

    //se ele estiver acessando sem um email ele é barrado
    useEffect(() => {

        //volta para pagina principal..
        if (!location.state.email) {
            
            navigate('/');

        }

    }, [])

    const fetchVerifyCode = async () => {

        const code = document.getElementById('incode');

        setBtnContent("Loading...");
        setBtnStatus(false);

        try {
        
            const response =
            await fetch(`http://localhost:8005/token/verify-forget-password/${code.value}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                mode: "cors"
            });
    
            const data = await response.json();

            document.querySelector('#error').innerHTML = "";

            if (data.status == false) {

                document.querySelector('#error').innerHTML = data.text;

            }else{

                navigate("/change-password", {state: {id_user: data.token_data.tokenable_id, type: data.token_data.tokenable_type, token: data.token_data.token}})

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
                    <a className="cursor-pointer mx-2 text-sm font-bold text-blue-500 hover:underline" onClick={() => { Location("/"); }} >
                        <FaRocketchat size={50} color="#3b82f6" title="metablog"/>
                    </a>

                </div>
                
                <div className="flex items-center flex-col mb-5 mx-auto p-2 border rounded-[16px] mt-2">
                    <MdOutlineMarkEmailRead size={25} color="gray" />
                    <p className="mt-1 text-center text-gray-500">We've send you the token to <b>{location.state.email}</b>. Type it on the shield.</p>
                </div>
                

                <form>
                    <div className="w-full mt-4">
                        <input
                            className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                            type="text"
                            maxLength="5"
                            placeholder="Token"
                            id='incode'
                        />
                        <small id="error_code" className="font-bold text-[#f01313]"></small>
                    </div>

                    <p id="error" className="font-bold text-[#f01313] mt-4 text-center"></p>

                    <div className="flex items-center justify-center mt-4">
                        
                        <Button activate={stateBtnStatus} bg_color="#3b82f6" hover_bg_color="#4f65ff" font_color="white" content={stateBtnContent} txtsize="16px" type="submit" onClick={fetchVerifyCode} />

                    </div>
                </form>
            </div>

        </div>
    )

}