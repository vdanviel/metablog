//libs
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

//component
import Banner from '../assets/banner-preview.png';
import RenderUserPublications from "../components/render/render_user_posts.jsx";
import Modal from "../components/modal.jsx";
import Button from "../components/button.jsx";
import AlertFadeDanger from "../components/alert/fade/danger.jsx";
import AlertFadeSuccess from "../components/alert/fade/success.jsx";

//icon
import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md"; 

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

  const user = JSON.parse(localStorage.getItem('user'))
  const params = useParams();

  const [stateModalEdit, setModalEdit] = useState(false);
  const [stateModalDelete, setModalDelete] = useState(false);

  const [stateBtnFollowActivate, setBtnFollowActivate] = useState(false);
  const [stateBtnContent, setBtnContent] = useState(false);

  const [stateMidiaErrorFade, setMidiaErrorFade] = useState(false);
  const [stateMidiaSuccessFade, setMidiaSuccessFade] = useState(false);

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

  const handleProfilePage = async () => {

    const data = await getUser(params.nick);

    console.log(data);

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

  useEffect(() => {

    handleProfilePage();

  }, [stateName, stateNick, stateBio, statePhoto, stateBanner]);

  const fetchEdit = () => {

    console.log(true);

  }

  const fetchNewBgImage = async (e) => {
    
    const file = e.target.files[0];

    let formdata = new FormData();
    formdata.append("id", user._id);
    formdata.append("image", file);

    let requestOptions = {
      method: 'PATCH',
      body: formdata,
      redirect: 'follow'
    };

    const response = await fetch("http://localhost:8005/user/upload-banner", requestOptions);
    const data = await response.json();

    if (data.status == false) {
      
      setMidiaErrorFade(true);

      setTimeout(() => {

        setMidiaErrorFade(false);

      }, 2500)

    }else{

      setMidiaSuccessFade(true)

      setTimeout(() => {

        setMidiaSuccessFade(false);

      }, 2500);

      handleProfilePage();

    }

  }

  const fetchNewProfileImage = (e) => {

    const file = e.target.files;

    console.log(file);

  }

  const edit_md_content = (

    <form>
        <div className="w-full mt-4">
            <input
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="email"
                placeholder="Email Address"
                id='inemail'
            />
            <small id="error_email" className="font-bold text-[#f01313]"></small>
        </div>

        <div className="w-full mt-4">
            <input
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="password"
                id='inpassword'
                placeholder="Make sure to remember it"
                aria-autocomplete=''
            />
            <small id="error_password" className="font-bold text-[#f01313]"></small>
        </div>

        <p id="error" className="font-bold text-[#f01313] mt-4 text-center"></p>

        <div className="flex items-center justify-between mt-4">
            
            <Button activate={stateBtnFollowActivate} bg_color="#3b82f6" hover_bg_color="#4f65ff" font_color="white" content={stateBtnContent} txtsize="16px" type="submit" onClick={fetchEdit} />

        </div>
    </form>


  );

  const delete_md_content = (

    <form>
        <div className="w-full mt-4">
            <input
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="email"
                placeholder="Email Address"
                id='inemail'
            />
            <small id="error_email" className="font-bold text-[#f01313]"></small>
        </div>

        <div className="w-full mt-4">
            <input
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="password"
                id='inpassword'
                placeholder="Make sure to remember it"
                aria-autocomplete=''
            />
            <small id="error_password" className="font-bold text-[#f01313]"></small>
        </div>

        <p id="error" className="font-bold text-[#f01313] mt-4 text-center"></p>

        <div className="flex items-center justify-between mt-4">
            
            <Button activate={stateBtnFollowActivate} bg_color="#3b82f6" hover_bg_color="#4f65ff" font_color="white" content={stateBtnContent} txtsize="16px" type="submit" onClick={fetchEdit} />

        </div>
    </form>


  );

  const account_or_profile = () => {

    if (params.nick == user.nick) {
      
      return (
        <div className="inline-flex items-center justify-center">

          <span className="bg-white rounded-[16px] p-4 inline-flex items-center space-x-4">
            <MdEdit className="cursor-pointer" onClick={() => setModalEdit(!stateModalEdit)} size={40}/>
            <MdDeleteForever className="cursor-pointer" onClick={() => setModalDelete(!stateModalDelete)} color="red" size={40}/>
          </span>

        </div>
      )

    }else{

      return(
        <Button bg_color="#3b82f6" hover_bg_color="#4f65ff" font_color="white" activate={true} content={"Follow"}/>
      )

    }

  }

  return (
    <div className="flex flex-col justify-center items-center mt-[10vh]">
      
      {/* modal editar */}
      <Modal content={edit_md_content} onClose={() => setModalEdit(false)} onOpen={stateModalEdit} title={"Edit your account"}/>

      {/* modal deletar */}
      <Modal content={delete_md_content} onClose={() => setModalDelete(false)} onOpen={stateModalDelete} title={"To delete your account confirm your password"}/>

      {/*Caso erro midia*/}
      {stateMidiaErrorFade && <AlertFadeDanger message="Error on updating file." duration={1500} />}

      {/* caso sucesso em upload midia */}
      {stateMidiaSuccessFade && <AlertFadeSuccess message="Sucess!" duration={1500} />}

      <div className="relative flex flex-col items-center rounded-[20px] mx-auto p-4 bg-white bg-clip-border shadow-3xl shadow-shadow-500 mb-6">
        <div className="relative flex h-32 w-full justify-center rounded-xl bg-cover">
          <img src={stateBanner || Banner} className="absolute object-cover flex h-32 w-full justify-center rounded-xl bg-cover" alt="banner" />
            {user.nick == params.nick && (
              <span className="z-20 flex justify-end w-full items-end m-2">
                <div className="bg-white p-2 rounded-full h-fit">
                  <label htmlFor="media-upload-bg" ><MdEdit className="cursor-pointer" /></label>
                  <input
                    type="file"
                    id="media-upload-bg"
                    onChange={fetchNewBgImage}
                    accept="image/jpeg, image/png, image/gif"
                    className="hidden"
                  />
                </div>
                
              </span>
            )}
          <div className="absolute -bottom-12 h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-white">
            <img className="h-full w-full rounded-full p-1" src={statePhoto || "https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_user-256.png"} alt="user-photo" />
            {user.nick == params.nick && (
              <span className="relative z-20 inset-x-[78%] bottom-1/2">
                <div className="bg-[#3b82f6] p-2 rounded-full h-fit w-fit">
                  <label htmlFor="media-upload-pf" ><MdEdit className="cursor-pointer" color="white" /></label>
                  <input
                    type="file"
                    id="media-upload-pf"
                    onChange={fetchNewProfileImage}
                    accept="image/jpeg, image/png, image/gif"
                    className="hidden"
                  />
                </div>
                
              </span>
            )}
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

      {account_or_profile()}

      <p className="text-[20px] font-bold my-5">Posts</p>

      <div className="flex justify-center lg:bg-white rounded-[16px] lg:min-w-[90%] lg:px-6 lg:py-16">
        {/* Renderiza os posts */}
        {stateUser && <RenderUserPublications user={stateUser} /> }
      </div>

    </div>
  );
}
