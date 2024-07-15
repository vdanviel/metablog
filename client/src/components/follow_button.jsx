import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "./button.jsx";

export default function FollowButton({profile}) {

    const [stateBtnFollowActivate, setBtnFollowActivate] = useState(false);
    const [stateIsFollowing, setIsFollowing] = useState(false);

    const user = JSON.parse(localStorage.getItem('user'))
    const params = useParams();
    const navigate = useNavigate();

    // Verificar se o usuário está seguindo o usuário com o nickname seguinte
    const checkFollowingStatus = async () => {    

        // Lógica para verificar se o usuário autenticado segue o seguinte

        setBtnFollowActivate(false);

        const already_follow = user.following.some((nick) => nick.equals(params.nick))

        if (already_follow) {
            setIsFollowing(true);
        }

        setBtnFollowActivate(true);

    };

    useEffect(() => {

        checkFollowingStatus();

    }, [stateIsFollowing, profile]);

    const followUser = async () => {

        try {
            
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
    
            let raw = JSON.stringify({
            "id_user": "66959319fd3e6dadf06b721c",
            "nick": "kata"
            });
    
            let requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };
    
            const response = await fetch("http://localhost:8005/user/follow", requestOptions);
            const data = await response.json();

            if


        } catch (error) {
            console.error(error);
        }

    }

    // Função para seguir ou deixar de seguir o usuário
    const handleFollowToggle = async () => {

        if (stateIsFollowing) {
            // Deixar de seguir

            await unfollowUser(userId, followingNickname);


            setIsFollowing(false);
        } else {
            // Seguir

            await followUser(userId, followingNickname);


            setIsFollowing(true);
        }
    };

    return (
        
        <Button bg_color="#3b82f6" hover_bg_color="#4f65ff" font_color="white" activate={stateBtnFollowActivate} content={stateIsFollowing ? "Unfollow" : "Follow"} onClick={handleFollowToggle}/>  
    )

}