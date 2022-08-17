import React, { useState } from 'react';
import Cookies from 'js-cookie'
import API_Database from '../apis/database';

const Login = () => {
    const   [errorMsg, setErrorMsg] = useState({email: '',
                                                passwd: ''});
    
    const submit = (e)=>{
        e.preventDefault();
        
        let emailMatch = (e.target.email.value).match(/^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
            passwdMatch = (e.target.passwd.value).match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,20}$/);
        
        if(emailMatch && passwdMatch){
            setErrorMsg({
                email: '',
                passwd: ''
            });
            const user = {
                email : e.target.email.value,
                passwd : e.target.passwd.value,
            }
            
            API_Database.login(user, (result)=>{
                if(!result.status === 202){
                    (e.target[2]).animate([
                        {backgroundColor: "rgba(255, 0, 0, 0.626)"},
                        {color: "rgba(0, 0, 0, 0.626)"},
                        {transform: "translateX(0px)"},
                        {transform: "translateX(5px)"},
                        {transform: "translateX(-5px)"},
                        {transform: "translateX(0px)"}
                    ], {duration: 300});
                }
                Cookies.set('session', JSON.stringify(result.data), {sameSite: "strict"});
                window.location.href = window.location.origin;
            })
        }else{
            const msgArray = ['email incorect', 'mot de passe incorect minimum 8 caractaire une maj et un chiffre'];
            setErrorMsg({
                email: emailMatch ?  '' : msgArray[0],
                passwd: passwdMatch ? '' : msgArray[1]
            });
        }
    };

    return (
        <form onSubmit={submit}>

            <div className='form_item'>
                <input id='email' type="text"></input>
                <label htmlFor='email'>email</label>
                <p className='errorMsg'>{errorMsg.email}</p>
            </div>

            <div className='form_item'>
                <input id='passwd' type="password"></input>
                <label htmlFor='passwd'>mot de passe</label>
                <p className='errorMsg'>{errorMsg.passwd}</p>
            </div>

            <div className='form_item'>
                <input htmlFor='submit' type="submit"/>
            </div>

        </form>
    );
};

export default Login;