import { useNavigate } from "react-router-dom";
import { useState } from "react";

//icons..
import { FaRocketchat } from "react-icons/fa6";

//components..
import Button from "../components/button.jsx";

export default function Register() {

  const navigate = useNavigate();
  const [btnContentState, setBtnContent] = useState("Let's Begin!");
  const [btnActivateState, setBtnActivate] = useState(true);

    const register_user = async (event) => {

        event.preventDefault();

        setBtnContent("Loading...");
        setBtnActivate(false);

        let name = document.querySelector("#username");
        let email = document.querySelector("#emailAddress");
        let password = document.querySelector("#password");
        let bio = document.querySelector("#bio");

        try {
            const response = await fetch("http://localhost:8005/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name.value,
                    email: email.value,
                    password: password.value,
                    bio: bio.value
                })
            });
            
            const data = await response.json();

            if (data.status == false) {
              
              name.classList.remove('border-red-400');
              document.querySelector("#error_name").innerText = "";
              email.classList.remove('border-red-400');
              document.querySelector("#error_email").innerText = "";
              password.classList.remove('border-red-400');
              document.querySelector("#error_password").innerText = "";
              bio.classList.remove('border-red-400');
              document.querySelector("#error_bio").innerText = "";


              if (data.missing) {
              
                data.missing.forEach(element => {
                  
                  switch (element) {
                    case 'name':
                      
                      name.classList.add('border-red-400');
                      document.querySelector("#error_name").innerText = "Name is required.";
  
                      break;
  
                    case 'email':
                      
                      email.classList.add('border-red-400');
                      document.querySelector("#error_email").innerText = "Email is required.";
  
                      break;
  
                    case 'password':
                      
                      password.classList.add('border-red-400');
                      document.querySelector("#error_password").innerText = "Password is required.";
  
                      break;
  
                    case 'bio':
                      
                      bio.classList.add('border-red-400');
                      document.querySelector("#error_bio").innerText = "Biografy is required.";
  
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

              navigate("/sign-in", {state: {name: name.value, email: email.value}});

            }

        } catch (error) {

          console.error('Error registering user:', error);

        }

        setBtnContent("Let's Begin!");
        setBtnActivate(true);

    }

    return (
        <section className="max-w-4xl p-6 mx-auto bg-white rounded-[16px] p-5 m-5">

        <div className="flex justify-center mx-auto">
          <FaRocketchat size={50} color="#3b82f6" title="metablog"/>
        </div>
        <p className="text-slate-400 text-center">Create your account on metablog. Wa wa.</p>

        <form className="mt-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="username" className="text-gray-700">Name</label>
              <input
                id="username"
                placeholder="Jennifer Alexander"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none"
              />
              <small id="error_name" className="font-bold text-[#f01313]"></small>
            </div>
  
            <div>
              <label htmlFor="emailAddress" className="text-gray-700">Email</label>
              <input
                id="emailAddress"
                placeholder="youremail@email.com"
                type="email"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none"
              />
              <small id="error_email" className="font-bold text-[#f01313]"></small>
            </div>

            <div>
              <label htmlFor="password" className="text-gray-700">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Use a strong password"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none"
              />
              <small id="error_password" className="font-bold text-[#f01313]"></small>
            </div>
  
            <div className="sm:col-span-2">
              <label htmlFor="bio" className="text-gray-700">Biography</label>
              <textarea
                id="bio"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md resize-none focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none"
                style={{ height: "100px" }}
                placeholder="Tell us about yourself..."
              />
              <small id="error_bio" className="font-bold text-[#f01313]"></small>
            </div>

            <a className="cursor-pointer" onClick={() => { navigate("/sign-in"); }} >Already have an account?</a>

            <div className="flex justify-end items-center sm:col-span-2 mt-6">
              <p id="error" className="font-bold text-[#f01313]"></p>

              <Button activate={btnActivateState} bg_color="#3b82f6" hover_bg_color="#4f65ff" font_color="white" content={btnContentState} txtsize="16px" type="submit" onClick={register_user} />
            </div>
          </div>
        </form>
      </section>
    );

}
