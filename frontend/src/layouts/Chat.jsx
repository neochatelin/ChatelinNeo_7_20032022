import React, { useContext, useEffect, useRef } from 'react';
import ChatForm from '../components/ChatForm';
import Message from '../components/Message';
import { Context } from '../config/Context';

const Chat = () => {
    const { messages } = useContext(Context);

    const ChatEndRef = useRef(null);
    
    const scrollToBottom = () => {
        ChatEndRef.current?.scrollIntoView();
    }
    
    useEffect(()=>{
        scrollToBottom();
    }, [messages]);
    
    return (
        <div className='Chat'>
            <div className='messages'>
                {messages.map((val)=><Message key={val.id} value={val} /> )}
            </div>
            <div ref={ChatEndRef} />
            <ChatForm/>
        </div>
    );
};

export default Chat;