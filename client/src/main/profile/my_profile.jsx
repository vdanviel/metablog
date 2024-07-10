import { useState, useEffect } from "react";

import Banner from '../../assets/banner-preview.png';

export default function MyProfile() {

  const [stateName, setName] = useState('Loading..');
  const [stateNick, setNick] = useState('Loading..');
  const [stateBio, setBio] = useState('Loading..');
  const [statePhoto, setPhoto] = useState('Loading..');
  const [stateFollowers, setFollowers] = useState('Loading..');
  const [stateFollowing, setFollowing] = useState('Loading..');
  const [stateFollowingCount, setFollowingCount] = useState('Loading..');
  const [stateFollowersCount, setFollowersCount] = useState('Loading..');

  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {

    setName(user.name)
    setNick(user.nick)
    setBio(user.bio)
    setPhoto(user.photo)
    setFollowers(user.followers)
    setFollowing(user.following)
    setFollowersCount(user.followers.length)
    setFollowingCount(user.following.length)

  }, [])

  return(
      <div className="flex flex-col justify-center items-center mt-[10vh]">
        <div className="relative flex flex-col items-center rounded-[20px] w-[400px] mx-auto p-4 bg-white bg-clip-border shadow-3xl shadow-shadow-500 ">

            <div className="relative flex h-32 w-full justify-center rounded-xl bg-cover" >
                <img src={Banner} className="absolute object-cover flex h-32 w-full justify-center rounded-xl bg-cover"/> 
                <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-white">
                    <img className="h-full w-full rounded-full p-1" src={statePhoto || "https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_user-256.png"} alt="user-photo" />
                </div>
            </div> 

            <div className="mt-16 flex flex-col items-center text-center">
                <h4 class="text-xl font-bold text-navy-700">
                  {stateName}
                </h4>
                <p className="text-base font-normal text-gray-600">@{stateNick}</p>
                <p className="text-base font-normal text-gray-600">{stateBio}</p>
            </div> 

            <div className="mt-6 mb-3 flex gap-14 md:!gap-14">
                <div className="flex flex-col items-center justify-center">
                <p className="text-2xl font-bold text-navy-700">17</p>
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
        <p className="font-normal text-navy-700 mt-20 mx-auto w-max">Profile Card component from <a href="https://horizon-ui.com?ref=tailwindcomponents.com" target="_blank" className="text-brand-500 font-bold">Horizon UI Tailwind React</a></p>  
    </div>
  )

}