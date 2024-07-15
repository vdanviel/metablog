//libs
import { useNavigate } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroll-component';

import { TfiMinus } from "react-icons/tfi";

//icons
import { MdDoNotDisturb } from "react-icons/md";

//carrousell..
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../styles/carrousel.css";
import Slider from "react-slick";
import { useState, useEffect } from "react";

const fetchPosts = async (nick, offset) => {
  try {
    const requestOptions = {
      method: 'GET'
    };

    const response = await fetch(`http://localhost:8005/user/info/${nick}/${offset}/5`, requestOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error requesting profile: ', error);
  }
};

export default function RenderUserPublications({user}) {

    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [offset, setOffset] = useState(0);

    const navigate = useNavigate();

    const loadMorePosts = async () => {

        const newPosts = await fetchPosts(user.nick, offset);

        if (newPosts.posts.length === 0) {
            setHasMore(false);
        } else {

            setPosts([...posts, ...newPosts.posts]);
            setOffset(offset + 5);

        }

    };

    useEffect(() => {

        loadMorePosts();

    }, [posts])

    const renderPosts = (user, posts) => {

        if (!posts || posts.length === 0) {
            return (
                <div key={"no-posts"} className="flex flex-col items-center overflow-y-hidden m-5 justify-center p-4 bg-white rounded-lg max-w-md mx-auto lg:shadow-lg">
                <div className="flex justify-center w-full">
                    <span className="text-gray-400">
                    <MdDoNotDisturb size={24} />
                    </span>
                </div>
                <div className="flex flex-col items-center justify-center mt-4">
                    <span className="inline-flex items-center gap-1">
                    <p className="text-lg font-semibold text-gray-800">@{user.nick} has no posts.</p>
                    </span>
                    <p className="text-sm text-gray-600 mt-2">Nothing to see here!</p>
                </div>
                </div>
            );
        }

        return posts.map(item => {

            if (item.media.length === 0) {
                return (
                <div key={item._id} className="w-[32vh] lg:w-[40vh] overflow-hidden bg-white rounded-lg lg:shadow-lg m-5">
                    <div className="px-4 py-2">
                    <div className="flex items-center gap-1 mb-3">
                        <img className="w-[30px] h-[30px] rounded-full object-cover" src={user.photo || "https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_user-256.png"} alt="profile_pic"/>
                        <p className="text-xs font-bold text-gray-800 break-words">@{user.nick}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-600 break-words">{item.content}</p>
                    </div>
                    <div className="flex items-center justify-between px-4 py-2 bg-[#3b82f6]">
                    <small className="text-sm text-white">{new Date(item.created_at).toLocaleString()}</small>
                    <button onClick={() => navigate('post/' + item._id)} className="px-2 py-1 text-sm font-semibold text-gray-900 transition-colors duration-300 transform bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none">More</button>
                    </div>
                </div>
                );
            } else {
                const renderMidias = item.media.map((url, index) => {
                if (url.match(/\.(png|jpg|jpeg|webp)$/)) {
                    return (
                    <a key={index} target="_blank" href={url}>
                        <img className="object-cover w-full h-[30vh] rounded-b-lg" src={url} />
                    </a>
                    );
                } else if (url.match(/\.(mp4|mkv|webm|mov)$/)) {
                    return (
                    <video key={index} controls className="object-cover w-full h-[30vh] rounded-b-lg">
                        <source src={url} type={"video/" + url.split('.').pop()} />
                    </video>
                    );
                }
                });

                const carousel = () => {
                if (renderMidias.length === 1) {
                    return renderMidias[0];
                } else {
                    return (
                    <div className="slider-container m-0 p-0">
                        <Slider dots={true} infinite={true} speed={500} slidesToShow={1} slidesToScroll={1}>
                        {renderMidias}
                        </Slider>
                    </div>
                    );
                }
                };

                return (
                <div key={item._id} className="m-5">
                    <div className="w-[32vh] lg:w-[40vh] p-0 m-0 bg-white rounded-t-lg lg:shadow-lg">
                    <div className="px-4 py-2">
                        <div className="flex items-center gap-1 mb-3">
                        <img className="w-[30px] h-[30px] rounded-full object-cover" src={user.photo || "https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_user-256.png"} alt="profile_pic"/>
                        <p className="text-xs font-bold text-gray-800 break-words">@{user.nick}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-600 break-words">{item.content}</p>
                    </div>
                    <div className="flex items-center justify-between px-4 py-2 bg-[#3b82f6]">
                        <small className="text-sm text-white">{new Date(item.created_at).toLocaleString()}</small>
                        <button onClick={() => navigate('post/' + item._id)} className="px-2 py-1 text-sm font-semibold text-gray-900 transition-colors duration-300 transform bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none">More</button>
                    </div>
                    {carousel()}
                    </div>
                </div>
                );
            }
        });

    };

    return (
        <InfiniteScroll
        dataLength={posts.length}
        next={loadMorePosts}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<div style={{ textAlign: 'center' }}><p className="text-gray-500 flex justify-center items-center mt-4"><TfiMinus /></p></div>}
        >
        {renderPosts(user, posts)}
        </InfiniteScroll>
    );
}
