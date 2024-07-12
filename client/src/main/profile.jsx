import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import Banner from '../assets/banner-preview.png';
import RenderUserPublications from "../components/render/render_user_posts.jsx";

export default function MyProfile() {
  const [stateName, setName] = useState('...');
  const [stateNick, setNick] = useState('...');
  const [stateBio, setBio] = useState('...');
  const [statePhoto, setPhoto] = useState(null);
  const [stateBanner, setBanner] = useState(null);
  const [stateFollowingCount, setFollowingCount] = useState('...');
  const [stateFollowersCount, setFollowersCount] = useState('...');
  const [statePostsCount, setPostsCount] = useState('...');
  const [stateUser, setUser] = useState(null);

  const params = useParams();

  const getUser = async (nick) => {
    try {

      var requestOptions = {
        method: 'GET'
      };

      const response = await fetch(`http://localhost:8005/user/find/${nick}`, requestOptions);
      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error on requisting profile: ', error);
    }
  };

  useEffect(() => {
    const handleProfilePage = async () => {

      const data = await getUser(params.nick);

      if (data) {
        setName(data.name);
        setNick(data.nick);
        setBio(data.bio);
        setPhoto(data.photo);
        setBanner(data.banner);
        setFollowingCount(data.following_count);
        setFollowersCount(data.followers_count);
        setPostsCount(data.posts_count);
        setUser(data);

      }



    };

    handleProfilePage();
  }, [params.nick]);

  return (
    <div className="flex flex-col justify-center items-center mt-[10vh]">
      <div className="relative flex flex-col items-center rounded-[20px] mx-auto p-4 bg-white bg-clip-border shadow-3xl shadow-shadow-500">
        <div className="relative flex h-32 w-full justify-center rounded-xl bg-cover">
          <img src={stateBanner || Banner} className="absolute object-cover flex h-32 w-full justify-center rounded-xl bg-cover" alt="banner" />
          <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-white">
            <img className="h-full w-full rounded-full p-1" src={statePhoto || "https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_user-256.png"} alt="user-photo" />
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center text-center">
          <h4 className="text-xl font-bold text-navy-700">
            {stateName}
          </h4>
          <p className="text-base font-normal text-gray-600">@{stateNick}</p>
          <p className="text-base font-normal text-gray-600">{stateBio}</p>
        </div>

        <div className="mt-6 mb-3 flex gap-14 md:!gap-14">
          <div className="flex flex-col items-center justify-center">
            <p className="text-2xl font-bold text-navy-700">{statePostsCount}</p>
            <p className="text-sm font-normal text-gray-600">Posts</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-2xl font-bold text-navy-700">
              {stateFollowersCount}
            </p>
            <p className="text-sm font-normal text-gray-600">Followers</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-2xl font-bold text-navy-700">
              {stateFollowingCount}
            </p>
            <p className="text-sm font-normal text-gray-600">Following</p>
          </div>
        </div>
      </div>

      <p className="text-[20px] font-bold my-5">Posts</p>

      <div className="flex justify-center lg:bg-white rounded-[16px] w-full lg:px-6 lg:py-16">
        {/* Renderiza os posts */}
        {stateUser && <RenderUserPublications user={stateUser} /> }
      </div>

    </div>
  );
}
