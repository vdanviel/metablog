// RenderFeed.jsx
import React, { useEffect, useState, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { MdDoNotDisturb } from "react-icons/md";
import { PiSmileySad } from "react-icons/pi";
import { TfiMinus } from "react-icons/tfi";
import Slider from "react-slick";

export default function RenderFeed({ userId }) {
    const [publications, setPublications] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [offset, setOffset] = useState(0);

    const fetchItems = async (id, offset, limit) => {
        try {
            const response = await fetch(`http://localhost:8005/post/all/${id}/${offset}/${limit}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            return response.json();
        } catch (error) {
            console.error('Error on requesting feed: ', error);
        }
    }

    const fetchMoreData = async () => {
        const data = await fetchItems(userId, offset, 10);

        if (data.feed.length == 0) {
            setHasMore(false);
        } else {
            setPublications(prev => [...prev, ...data.feed]);
            setOffset(prev => prev + 10);
        }
        
    }

    useEffect(() => {
        fetchMoreData();
    }, [publications]);

    const renderMedia = (media) => {
        return media.map((url, index) => {
            if (url.match(/\.(png|jpg|jpeg|webp)$/)) {
                return (
                    <a key={index} target="_blank" href={url}>
                        <img className="object-cover w-full h-[30vh] rounded-b-lg" src={url} alt="media"/>
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

    const renderPublications = () => {
        if (publications.length === 0) {
            return (
                <div key={"no-posts"} className="flex flex-col items-center overflow-y-hidden m-5 justify-center p-4 bg-white rounded-lg max-w-md mx-auto lg:shadow-lg">
                    <div className="flex justify-center w-full">
                        <span className="text-gray-400">
                            <MdDoNotDisturb size={24} />
                        </span>
                    </div>
                    <div className="flex flex-col items-center justify-center mt-4">
                        <span className="inline-flex items-center gap-1">
                            <p className="text-lg font-semibold text-gray-800">You have no posts yet</p>
                            <PiSmileySad size="22px"/>
                        </span>
                        <p className="text-sm text-gray-600 mt-2">Post something or follow someone!</p>
                    </div>
                </div>
            );
        }

        return publications.map(item => (
            <div key={item._id} className="w-[32vh] lg:w-[40vh] overflow-hidden bg-white rounded-lg lg:shadow-lg">
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
        ));
    }

    return (
        <InfiniteScroll
            dataLength={publications.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<div className="text-center"><svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg> Loading...</div>}
            endMessage={<p className="text-gray-500 flex justify-center items-center mt-4"><TfiMinus /></p>}
        >
            {renderPublications()}
        </InfiniteScroll>
    );
}
