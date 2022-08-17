import React, { useContext } from 'react';
import { useState } from 'react';
import API_Database from '../apis/database';
import { Context } from '../config/Context';

const ChatForm = () => {
    const [ _, setLoading] = useState(false);
    const {GetMessages} = useContext(Context);
    
    const submit = (e)=>{
        e.preventDefault();
        
        if(!e.target[0].value.trim().length>0 && e.target[1].value === ""){
            (e.target[2]).animate([
                {
                    backgroundColor: "white",
                    color: "#FD2D01",
                    transform: "translateX(0px)"
                },
                {transform: "translateX(5px)"},
                {transform: "translateX(-5px)"},
                {transform: "translateX(0px)"}
            ], {duration: 350});
        }else{
            const formData = new FormData();
            formData.append( "image", e.target[1].files[0] );
            formData.append( "content", e.target[0].value ); 
            
            API_Database.createMessage(formData, ()=>{GetMessages(setLoading);});
        }
        e.target[0].value = '';
        e.target[1].value = '';
    }

    return (
        <form className='chatForm' onSubmit={submit} action="http://localhost:3001/api/post/" method='post' encType="multipart/form-data">
            <label htmlFor='image'><img src="./asset/icon-trombone.png" alt="selectionne un ficher" /></label>
            <textarea type='text'></textarea>
            <input type='file' id='image'></input>
            <input className='submit' type='submit'></input>
        </form>
    );
};

export default ChatForm;