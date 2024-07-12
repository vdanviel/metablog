// Feed.jsx
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/carrousel.css";
import PublicateForm from "../components/publicate_form.jsx";
import AlertFadeSuccess from "../components/alert/fade/success.jsx";
import RenderFeed from "../components/render/render_feed.jsx"; // Import the new component

export default function Feed() {
    const [stateToggleAlert, setToggleAlert] = useState(false);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleHasNew = useCallback(() => {
        setToggleAlert(true);
        setTimeout(() => {
            setToggleAlert(false);
        }, 2150);
    }, []);

    return (
        <div className="flex align-center space-y-6 flex-col pt-12 lg:mx-28 lg:pt-auto lg:mt-16 lg:bg-white lg:rounded-[16px] lg:p-5">
            <h1 className="text-center text-slate-400 font-bold">Welcome again, @{user.nick}!</h1>
            <div className="max-h-[80vh] overflow-y-auto grid gap-10 justify-items-center">
                {stateToggleAlert && <AlertFadeSuccess key={"alert" + (new Date().getTime())} message="Publicated successfully!" duration={1500} />}
                <PublicateForm onPublish={handleHasNew} id_user={user._id} nick={user.nick} photo={user.photo} />
                <h1 className="text-center text-slate-400 font-bold">These are the current posts</h1>
                <RenderFeed userId={user._id} />
            </div>
        </div>
    );
}
