import Button from "../components/button.jsx";

export default function Register() {

    const register_user = async (event) => {

        event.preventDefault();

        let name = document.querySelector("#username").value;
        let email = document.querySelector("#emailAddress").value;
        let password = document.querySelector("#password").value;
        let bio = document.querySelector("#bio").value;

        

        try {
            const response = await fetch("http://localhost:8005/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                    bio: bio
                })
            });
            
            const data = await response.json();

            console.log(data);

        } catch (error) {
            console.error('Error registering user:', error);
        }

    }

    return (
        <section className="max-w-4xl p-6 mx-auto bg-white rounded-[16px] p-5 m-5">
        <h2 className="text-lg font-semibold text-gray-700 capitalize">Register on <span className="bg-[#4f65ff] p-1 text-white rounded-[16px]">MetaBlog!</span> </h2>
  
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
            </div>
  
            <div>
              <label htmlFor="emailAddress" className="text-gray-700">Email</label>
              <input
                id="emailAddress"
                placeholder="youremail@email.com"
                type="email"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="password" className="text-gray-700">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Use a strong password"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none"
              />
            </div>
  
            <div className="sm:col-span-2">
              <label htmlFor="bio" className="text-gray-700">Biography</label>
              <textarea
                id="bio"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md resize-none focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none"
                style={{ height: "100px" }}
                placeholder="Tell us about yourself..."
              />
            </div>
  
            <div className="flex justify-end items-center sm:col-span-2 mt-6">
              <p id="error" className="font-bold text-[#f01313]"></p>
              <Button bg_color="#3b82f6" hover_bg_color="#4f65ff" font_color="white" content="Let's Begin" txtsize="16px" type="submit" onClick={register_user} />
            </div>
          </div>
        </form>
      </section>
    );

}
