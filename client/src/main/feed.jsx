//react and libs..
import { useEffect, useState  } from "react";

//styles..
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/carrousel.css"

//components..
import { IoClose } from "react-icons/io5";
import Slider from "react-slick";
import Button from "../components/button.jsx";

export default function Feed() {
    
    const [statePublications, setPublications] = useState(null);
    const [stateMoreButton, setMoreButton] = useState(null);
    const [statePubliLimit, setPubliLimit] = useState(5);

    const user = JSON.parse(localStorage.getItem('user'));

    const items = async (id,limit) => {
        try {
            
            const response = await fetch(`http://localhost:8005/post/all/${id}/${limit}`, {
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

    //ao carregar a pagina carrega os posts..
    useEffect(() => {

        const fetchPublications = (data) => {

            const publications = data.feed.map(item => { 

                if (item.media.length == 0) {
                    
                    return(
                        <div key={item._id} className="max-w-xs overflow-hidden bg-white rounded-lg lg:shadow-lg ">
    
                            <div className="px-4 py-2">
                                <div className="flex items-center gap-1 mb-3">
                                    <img className="w-[30px] h-[30px] rounded-full object-cover" src={item.user.photo || "https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_user-256.png"} alt="profile_pic"/>
                                    <p className="text-xs font-bold text-gray-800">@{item.user.nick}</p>
                                </div>
                                <p className="mt-1 text-sm text-gray-600">{item.content}</p>
                            </div>
    
                            <div className="flex items-center justify-between px-4 py-2 bg-[#3b82f6]">
                                <small className="text-sm text-white">{new Date(item.created_at).toLocaleString()}</small>
                                <button className="px-2 py-1 text-sm font-semibold text-gray-900 transition-colors duration-300 transform bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none">More</button>
                            </div>    
    
                        </div>
                    )

                }else{

                    const render_midias = item.media.map(url => {

                            const midias = [];

                            if (url.indexOf(".png") != -1 || url.indexOf(".jpg") != -1 || url.indexOf(".jpeg") != -1 || url.indexOf(".webp") != -1) {
                                
                                midias.push(

                                    <img className="object-cover w-full h-[30vh] rounded-b-lg" src={url}/>

                                )

                            } else if (url.indexOf(".mp4") != -1 || url.indexOf(".mkv") != -1 || url.indexOf(".webm") != -1 || url.indexOf(".mov") != -1){

                                midias.push(

                                    <video controls className="object-cover w-full h-[30vh] rounded-b-lg">
                                        <source src={url} type={"video/" + url.substr(url.indexOf('.') + 1, url.length) } />
                                    </video>

                                )

                            }


                            return midias;
                        }
                    );

                    return(
                        <div key={item._id}>

                            <div className="max-w-xs lg:max-w-auto p-0 m-0 bg-white rounded-t-lg lg:shadow-lg ">
                                <div className="px-4 py-2">
                                    <div className="flex items-center gap-1 mb-3">
                                        <img className="w-[30px] h-[30px] rounded-full object-cover" src={item.user.photo || "https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_user-256.png"} alt="profile_pic"/>
                                        <p className="text-xs font-bold text-gray-800">@{item.user.nick}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-600">{item.content}</p>
                                </div>
        
                                <div className="flex items-center justify-between px-4 py-2 bg-[#3b82f6]">
                                    <small className="text-sm text-white">{new Date(item.created_at).toLocaleString()}</small>
                                    <button className="px-2 py-1 text-sm font-semibold text-gray-900 transition-colors duration-300 transform bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none">More</button>
                                </div>

                                <div className="slider-container m-0 p-0">
                                    <Slider {...{
                                        dots: true,
                                        infinite: true,
                                        speed: 500,
                                        slidesToShow: 1,
                                        slidesToScroll: 1
                                    }}>
                                        {render_midias}
                                    </Slider>
                                </div>

                            </div>

                            
    
                        </div>
                    )

                }

            });

            setPublications(publications);




        };

        const verifyMoreButton = (data) => {

            const addMorePosts = () => {

                setPubliLimit(statePubliLimit + 5);
    
            }

            //butão de mais posts..
            const button = data.more == true ? <Button activate={true} bg_color="#3b82f6" hover_bg_color="#4f65ff" font_color="white" content={"More Posts"} type={"button"} onClick={addMorePosts}/> : null

            //definindo front do butao
            setMoreButton(button);

        }

        const handleFeedScreen = async () => {
            const response = await items(user._id, statePubliLimit);
            const data = await response.json();

            fetchPublications(data);
            verifyMoreButton(data);
        }

        handleFeedScreen()

    }, [statePubliLimit]);


    const renderPublications = () => {
        if (!statePublications || statePublications.length === 0) {
            return (
                <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-lg max-w-md mx-auto">
                    <div className="flex justify-end w-full">
                        <span className="text-gray-400">
                            <IoClose size={24} />
                        </span>
                    </div>
                    <div className="flex flex-col items-center justify-center mt-4">
                    <p className="text-lg font-semibold text-gray-800">There are no posts yet.</p>
                    <p className="text-sm text-gray-600 mt-2">Post something or follow someone!</p>
                    </div>
                </div>
            );
        } else {
            return statePublications;
        }
    };

    const renderMoreButton = () => {
        return stateMoreButton;
    }

    return (
        <div className="flex align-center space-y-6 flex-col pt-12 lg:mx-28 lg:pt-auto lg:mt-16 lg:bg-white lg:rounded-[16px] lg:p-5">
            <h1 className="text-center text-slate-400 font-bold">These are the current posts</h1>
            <div className="max-h-[80vh] overflow-y-auto grid gap-10 justify-items-center">
                {renderPublications()}
                {renderMoreButton()}
            </div>
        </div>
    );
}
