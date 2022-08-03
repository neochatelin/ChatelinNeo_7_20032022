import Cookies from 'js-cookie';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../config/Context';
import Chat from '../layouts/Chat';

const HomePage = () => {
    const {GetMessages} = useContext(Context);
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
        <Chat/>
    );
};

export default HomePage;