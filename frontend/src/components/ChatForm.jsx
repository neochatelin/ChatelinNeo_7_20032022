import React, { useContext } from 'react';
import { useState } from 'react';
import API_Database from '../apis/database';
import { Context } from '../config/Context';

const ChatForm = () => {
    const [borderColor, setBorderColor] = useState('rgb(205, 205, 205)');
    const [ _, setLoading] = useState(false);
    const {GetMessages} = useContext(Context);
    
    const style = {
        form:{
            display: 'flex',
            margin: '10px auto',
            width: '100%',
            text: {
                borderRadius: '15px',
                width: '40vw',
                marginLeft: 'auto',
                padding: '0 10px',
                wordBreak: 'break-word',
                borderColor: borderColor,
                borderStyle: 'solid',
                resize: 'none',
                outline: 'none'
            },file:{
                display: 'none',
            },fileLabel:{
                display: 'flex',
                margin: '0 15px',
                borderRadius: '50%',
                backgroundColor: 'white',
                width: '50px',
                height: '50px',
                justifyContent: 'center',
                alignItems: 'center',
                img: {
                    width: '35px',
                    height: '35px',
                }
            },submit:{
                color: 'white',
                backgroundColor: '#FD2D01',
                padding: '10px',
                borderRadius: '15px',
                border: 'none',
                fontSize: '16px',
                marginRight: 'auto'
            }
        }
    }
    , submit = (e)=>{
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
        <div className='chatForm'>
            <form style={style.form} onSubmit={submit} action="http://localhost:3001/api/post/" method='post' encType="multipart/form-data">
                <textarea type='text' onFocus={()=>{setBorderColor('#FD2D01')}} onBlur={()=>{setBorderColor('rgb(205, 205, 205)')}} style={style.form.text}></textarea>
                <label htmlFor='image' style={style.form.fileLabel}><img style={style.form.fileLabel.img} src="./asset/icon-trombone.png" alt="selectionne un ficher" /></label>
                <input type='file' id='image' style={style.form.file}></input>
                <input type='submit' style={style.form.submit}></input>
            </form>
        </div>
    );
};

export default ChatForm;