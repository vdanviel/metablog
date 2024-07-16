import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Slider from "react-slick";

//styles..
import "../../styles/carrousel.css";

//icons..
import { TfiMinus } from "react-icons/tfi";

//images..
import Preview from "../../assets/photo-preview.png";

const RenderExplore = ({ searchParam }) => {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        if (searchParam) {
            setItems([]);  // Clear items when searchParam changes
            setPage(1);    // Reset page number
            setHasMore(true);  // Reset hasMore
            fetchData(1, searchParam);
        } else {
            setItems([]);  // Clear items when searchParam is empty
        }
    }, [searchParam]);

    const fetchData = async (pageNumber, currentSearchParam) => {
        try {
            if (currentSearchParam.length > 0) {
                const response = await fetch(`http://localhost:8005/explore/${currentSearchParam}?page=${pageNumber}&limit=5`);
                const data = await response.json();

                if (pageNumber === 1) {
                    setItems(data.users.concat(data.posts));
                } else {
                    setItems(prevItems => prevItems.concat(data.users.concat(data.posts)));
                }

                setPage(pageNumber + 1);
                setHasMore(data.users.length > 0 || data.posts.length > 0);
            } else {
                setItems([]);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setHasMore(false);
        }
    };

    const renderMedia = (media) => {
        return media.map((url, index) => {
            if (url.match(/\.(png|jpg|jpeg|webp)$/)) {
                return (
                    <a key={index} target="_blank" href={url}>
                        <img className="object-cover w-full h-[30vh] rounded-b-lg" src={url} alt="media" />
                    </a>
                );
            } else if (url.match(/\.(mp4|mkv|webm|mov)$/)) {
                return (
                    <video key={index} controls className="object-cover w-full h-[30vh] rounded-b-lg">
                        <source src={url} type={"video/" + url.split('.').pop()} />
                    </video>
                );
            }
            return null;
        });
    }

    return (
        <InfiniteScroll
            dataLength={items.length}
            next={() => fetchData(page, searchParam)}
            hasMore={hasMore}
            loader={""}
            endMessage={<p className="text-gray-500 flex justify-center items-center mt-4"><TfiMinus /></p>}
        >
            <div className="flex flex-col items-center gap-4 mt-16 mb-5">
                {items.length === 0 && searchParam && (
                    <p className="text-gray-500">No results found</p>
                )}
                {items.map((item, index) => (
                    <div key={index} className="max-w-md rounded overflow-hidden shadow-lg bg-white w-full">
                        {item.name && ( // Renderiza se for um usuário
                            <div className="m-5 flex items-center justify-center space-x-5">
                                <div onClick={() => window.location = window.location.origin + "/profile/" + item.nick} className='flex items-center justify-center gap-2 cursor-pointer'>
                                    <img className="h-[30px] w-[30px] rounded-full object-cover" src={item.photo || Preview} alt="profile_pic" />
                                    <p className="text-xs font-bold text-gray-800">@{item.nick}</p>
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <p className="text-xs font-bold text-gray-800">{item.followers.length}</p>
                                    <p className="text-xs">Followers</p>
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <p className="text-xs font-bold text-gray-800">{item.following.length}</p>
                                    <p className="text-xs">Following</p>
                                </div>
                            </div>
                        )}
                        {item.content && item.user && ( // Renderiza se for um post
                            <div>
                                <div className="px-4 py-2">
                                    <div onClick={() => navigate('/profile/' + item.user.nick)} className="flex items-center gap-1 mb-3">
                                        <img className="w-[30px] h-[30px] rounded-full object-cover" src={item.user.photo || "https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_user-256.png"} alt="profile_pic" />
                                        <p className="text-xs font-bold text-gray-800">@{item.user.nick}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-600">{item.content}</p>
                                </div>
                                <div className="flex items-center justify-between px-4 py-2 bg-[#3b82f6]">
                                    <small className="text-sm text-white">{new Date(item.created_at).toLocaleString()}</small>
                                    <button onClick={() => window.location = window.location.origin + "/profile/" + item.user.nick} className="px-2 py-1 text-sm font-semibold text-gray-900 transition-colors duration-300 transform bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none">More</button>
                                </div>
                                {item.media.length === 1 ? renderMedia(item.media) : (
                                    <div className="slider-container m-0 p-0">
                                        <Slider {...{
                                            dots: true,
                                            infinite: true,
                                            speed: 500,
                                            slidesToShow: 1,
                                            slidesToScroll: 1
                                        }}>
                                            {renderMedia(item.media)}
                                        </Slider>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </InfiniteScroll>
    );
};

export default RenderExplore;
