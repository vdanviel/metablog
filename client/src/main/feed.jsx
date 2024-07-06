import { useEffect, useState  } from "react";
import Flickity from "flickity";

export default function Feed() {
    
    const [statePublications, setPublications] = useState(null);

    const items = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const response = await fetch(`http://localhost:8005/post/all/${user._id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            return response;
        } catch (error) {
            console.error('Error on loading feed: ', error);
        }
    };

    useEffect(() => {

        const carrosel = document.querySelector('.main-carousel');

        const flkty = new Flickity(carrosel, {
            cellAlign: 'left',
            contain: true,
            autoPlay: true,
            prevNextButtons: false,
            pageDots: false
        });

        const fetchPublications = async () => {
            const response = await items();
            const data = await response.json();

            const publications = data.feed.map(item => (
                <div key={item._id} className="max-w-xs overflow-hidden bg-white rounded-lg lg:shadow-lg ">

                    <div className="px-4 py-2">
                        <div className="flex items-center gap-1 mb-3">
                            <img className="w-[30px] h-[30px] rounded-full object-cover" src={item.user.photo || "https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_user-256.png"} alt="profile_pic"/>
                            <p className="text-xs font-bold text-gray-800">@{item.user.nick}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-600">{item.content}</p>
                    </div>

                    <div className="main-carousel" data-flickity='{ "cellAlign": "left", "contain": true }'>
                        <div className="carousel-cell">
                            <img className="object-cover w-full h-48 mt-2" src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=320&q=80" alt="midia"/>
                        </div>
                        <div className="carousel-cell">
                            <img className="object-cover w-full h-48 mt-2" src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=320&q=80" alt="midia"/>
                        </div>
                        <div className="carousel-cell">
                            <img className="object-cover w-full h-48 mt-2" src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=320&q=80" alt="midia"/>
                        </div>
                    </div>

                    <div className="flex items-center justify-between px-4 py-2 bg-[#3b82f6]">
                        <small className="text-sm text-white">{item.created_at}</small>
                        <button className="px-2 py-1 text-sm font-semibold text-gray-900 transition-colors duration-300 transform bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none">More</button>
                    </div>

                </div>
            ));

            setPublications(publications);
        };

        fetchPublications();

        return(
            flkty.destroy()
        );

    }, []);

    const renderPublications = () => {
        if (!statePublications || statePublications.length === 0) {
            return <h1>There are no publications.</h1>;
        } else {
            return statePublications;
        }
    };

    return (
        <div className="flex align-center space-y-6 flex-col pt-12 lg:mx-28 lg:pt-auto lg:mt-16 lg:bg-white lg:rounded-[16px] lg:p-5">
            <h1 className="text-center text-slate-400 font-bold">Today</h1>
            <div className="max-h-[80vh] overflow-y-auto grid gap-10 justify-items-center">
                {renderPublications()}
            </div>
        </div>
    );
}
