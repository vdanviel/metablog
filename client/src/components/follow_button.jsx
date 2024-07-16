//libs..
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

//components..
import Button from "./button.jsx";
import AlertFadeDanger from "./alert/fade/danger.jsx";
import AlertFadeDefault from "./alert/fade/default.jsx";

export default function FollowButton(props) {

    const {profile} = props;

    const [stateBtnFollowActivate, setBtnFollowActivate] = useState(false);
    const [stateIsFollowing, setIsFollowing] = useState(false);
    const [stateFollowToggle, setFollowToggle] = useState(false);
    const [stateFollowStatusContent, setFollowStatusContent] = useState(null);

    const [stateFollowError, setFollowError] = useState(false);
    const [stateFollowErrorContent, setFollowErrorContent] = useState(null);

    const user = JSON.parse(localStorage.getItem('user'))
    const params = useParams();



    // Verificar se o usuário está seguindo o usuário com o nickname seguinte
    const checkFollowingStatus = async () => {    

        // Lógica para verificar se o usuário autenticado segue o seguinte

        setBtnFollowActivate(false);

        const already_follow = user.following.some((nick) => nick == params.nick);

        if (already_follow) {
            setIsFollowing(true);
        }

        setBtnFollowActivate(true);

    };

    useEffect(() => {

        checkFollowingStatus();

    }, [stateIsFollowing, profile]);

    const followUser = async (userId, followingNickname) => {

        try {
            
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
    
            let raw = JSON.stringify({
                "id_user": userId,
                "nick": followingNickname
            });
    
            let requestOptions = {
                method: 'PATCH',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
    
            const response = await fetch("http://localhost:8005/user/follow", requestOptions);
            const data = await response.json();

            if(data.status == false){

                setFollowError(true);
                setFollowErrorContent(data.text);

                setTimeout(() => {

                    setFollowError(false);
                    //setFollowErrorContent(data.text);

                }, 2500)

            }else{

                setFollowToggle(true);
                setFollowStatusContent(data.text);

                setTimeout(() => {
                    setFollowToggle(false);
                }, 2500);

            }


        } catch (error) {
            console.error(error);
        }

    }

    const unfollowUser = async (userId, followingNickname) => {

        try {
            
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
    
            let raw = JSON.stringify({
                "id_user": userId,
                "nick": followingNickname
            });
    
            let requestOptions = {
                method: 'PATCH',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
    
            const response = await fetch("http://localhost:8005/user/unfollow", requestOptions);
            const data = await response.json();

            if(data.status == false){

                setFollowError(true);
                setFollowErrorContent(data.text);

                setTimeout(() => {

                    setFollowError(false);
                    //setFollowErrorContent(data.text);

                }, 2500)

            }else{

                setFollowToggle(true);
                setFollowStatusContent(data.text);

                setTimeout(() => {
                    setFollowToggle(false);
                }, 2500);

            }


        } catch (error) {
            console.error(error);
        }

    }

    // Função para seguir ou deixar de seguir o usuário
    const handleFollowToggle = async () => {

        if (stateIsFollowing) {
            // Deixar de seguir

            await unfollowUser(user._id, params.nick);

            let remove_profile = user.following.filter(item => item !== params.nick);

            user.following = remove_profile;

            localStorage.setItem('user', JSON.stringify(user));

            //modificar se usuario segue...
            setIsFollowing(false);
        } else {

            // Seguir

            await followUser(user._id, params.nick);

            //atualizar o localstorage..
            user.following.push(params.nick);

            localStorage.setItem('user', JSON.stringify(user));

            //modificar se usuario segue...
            setIsFollowing(true);
        }
    };

    return (
        <div>
            {stateFollowError && <AlertFadeDanger content={stateFollowErrorContent} duration={1500} />}
            {stateFollowToggle && <AlertFadeDefault content={stateFollowStatusContent} duration={1500} />}
            <Button bg_color="#3b82f6" hover_bg_color="#4f65ff" font_color="white" activate={stateBtnFollowActivate} content={stateIsFollowing ? "Unfollow" : "Follow"} onClick={handleFollowToggle}/>  
        </div>
    )

}