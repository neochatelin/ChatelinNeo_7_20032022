import Cookies from 'js-cookie';
import { useContext, useEffect, useState } from 'react';
import DefaultProfilePicture from '../components/DefaultProfilePicture';
import { Context } from '../config/Context';
import Chat from '../layouts/Chat';

const HomePage = () => {
    const {GetMessages, user} = useContext(Context);
    const [messagesLoaded,setMessagesLoaded] = useState(true)
  
    if(!Cookies.get('session')){
        window.location.href = window.location.origin+'/connection'
    }

    useEffect(()=>{
        if(messagesLoaded){
            GetMessages(setMessagesLoaded);
        }
    }, [messagesLoaded, setMessagesLoaded, GetMessages])
    
    return (
        <>
            <header>
                <div onClick={()=>{window.location.href = window.location.origin+'/user'}}>
                    <DefaultProfilePicture user={{...user}}/>
                </div>
            </header>
            <Chat/>
        </>
    );
};

export default HomePage;