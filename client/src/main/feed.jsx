import { useEffect } from "react";

export default function Feed() {
    
    const items = () => {

        try {

            const user = JSON.parse(localStorage.getItem('user'));

            const response = fetch(`http://localhost:8005/post/all/${user._id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            return response;

        } catch (error) {

          console.error('Error on loading feed: ', error);

        }

    }

    useEffect(() => {

        let publications = [];

        items().then(data => data.json()).then(data => {
            
            data.feed.forEach(item => {
                
                
                
                publications.push((
                    <div className="max-w-xs overflow-hidden bg-white rounded-lg lg:shadow-lg ">
                        <div className="px-4 py-2">
                            <div className="flex items-center gap-1 mb-3">
                            <img className="w-[30px] rounded-full object-cover" src={data.user.photo || "https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_user-256.png"} alt="profile_pic"/>
                            <p className="text-xs font-bold text-gray-800">{data.user.nick}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi quos quidem sequi illum facere recusandae voluptatibus</p>
                        </div>
                        <img className="object-cover w-full h-48 mt-2" src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=320&q=80" alt="NIKE AIR"/>
                        <div className="flex items-center justify-between px-4 py-2 bg-[#3b82f6]">
                            <small className="text-sm text-white">11/10/2024 - 14:07</small>
                            <button className="px-2 py-1 text-sm font-semibold text-gray-900 transition-colors duration-300 transform bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none">More</button>
                        </div>
                    </div>
                ))

            });


        });

    }, []);

    return (
        
        <div className="flex align-center space-y-6 flex-col pt-12 lg:mx-28 lg:pt-auto lg:mt-16 lg:bg-white lg:rounded-[16px] lg:p-5 ">
            <h1 className="text-center text-slate-400 font-bold">Today</h1>

            <div className="max-h-[80vh] overflow-y-auto grid gap-10 justify-items-center">

            </div>

        </div>

    );

}