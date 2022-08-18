import React, { createContext, useState } from "react";
import Cookies from 'js-cookie';
import API_Database from "../apis/database";
export const Context = createContext();

export const DataProvider =  ({children}) => {
    const sessionUser = Cookies.get('session');
    const [user, setUser] = useState(sessionUser ? JSON.parse(Cookies.get('session')) : null);
    const [messages, setMessages] = useState([]);
    const GetMessages = (setLoading) => {
        setLoading(true)
        API_Database.getPublicPosts(0, 50, (result)=>{
            setMessages(result.data);
            setLoading(false)
        });
    }

    return (
        <Context.Provider
            value={{
                user, setUser,
                messages, setMessages, GetMessages
            }}
        >
            {children}
        </Context.Provider>
    )
}