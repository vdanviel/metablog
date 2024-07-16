//libs..
import InfiniteScroll from 'react-infinite-scroll-component';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//images..
import Preview from "../../assets/photo-preview.png";

//icons..
import { TfiMinus } from "react-icons/tfi";

export default function RenderFollowers({publicUser}){

    //reactives..
    const [stateAccounts, setAccounts] = useState([]);
    const [stateHasMore, setHasMore] = useState(true);
    const [stateOffset, setOffset] = useState(0);

    //vars..
    const navigate = useNavigate();

    const fetchAccounts = async (nick,offset) => {

        try {
            
            let requestOptions = {
               method: 'GET',
               redirect: 'follow'
            };
              
            const response = await fetch(`http://localhost:8005/user/follows/list/${nick}/${offset}/10`, requestOptions);
            const data = await response.json();

            return data;

        } catch (error) {
            console.error(error);
        }

    }

    const loadMoreAccounts = async () => {

        try {

            const newAccounts = await fetchAccounts(publicUser.nick, stateOffset);

            if (newAccounts.list.following.length === 0) {
                setHasMore(false);
            }else{
                setAccounts(prevData => stateAccounts.concat(prevData, newAccounts.list.followers));
                setOffset(stateOffset + 5)
                setHasMore(true);
            }

        } catch (error) {
            console.error(error);
        }

    }

    useEffect(() => {

        loadMoreAccounts();

    }, [stateAccounts]);

    const renderAccounts = (accounts) => {

        if(accounts.length == 0){

            return (
                <h4><b>@{publicUser.nick}</b>  has no followers.</h4>
            )

        }else{
            return accounts.map((account, index) => (

                    
                    <div key={index} className="px-4 py-2 shadow-lg rounded-[16px] m-5">
                        <div className="m-5 flex items-center justify-center space-x-5">
                            <div onClick={() => window.location = window.location.origin + "/profile/" + account.nick} className='flex items-center justify-center gap-2 cursor-pointer'>
                                <img className="h-[30px] w-[30px] rounded-full object-cover" src={account.photo || Preview} alt="profile_pic" />
                
                                <p className="text-xs font-bold text-gray-800">@{account.nick}</p>
                            </div>
                            
                            
                            <div className="flex  flex-col items-center justify-center">
                                <p className="text-xs font-bold text-gray-800">{account.followers.length}</p>
                                <p className="text-xs">Followers</p>
                            </div>
                            
                            <div className="flex flex-col items-center justify-center">
                                <p className="text-xs font-bold text-gray-800">{account.following.length}</p>
                                <p className="text-xs">Following</p>
                            </div>
                            
                        </div>
                    </div>
                    

                )
            );

        }

    }

    return(
        <InfiniteScroll
            dataLength={stateAccounts.length} //This is important field to render the next data
            next={loadMoreAccounts}
            hasMore={stateHasMore}
            loader={<h4>Loading...</h4>}
            endMessage={<div style={{ textAlign: 'center' }}><p className="text-gray-500 flex justify-center items-center mt-4"><TfiMinus /></p></div>
            }
        >
            {renderAccounts(stateAccounts)}
        </InfiniteScroll>
    )
}