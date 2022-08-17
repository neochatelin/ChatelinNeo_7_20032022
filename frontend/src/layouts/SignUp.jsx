import Cookies from 'js-cookie';
import React, { useState } from 'react';
import API_Database from '../apis/database';

const SignUp = () => {
    const   [errorMsg, setErrorMsg] = useState({userName:'',
                                                email: '',
                                                passwd: ''});

    const submit = (e)=>{
        e.preventDefault();

        let userNameMatch = (e.target.userName.value).match(/^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/),
            emailMatch = (e.target.email.value).match(/^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
            passwdMatch = (e.target.passwd.value).match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,20}$/);
        
        if(userNameMatch && emailMatch && passwdMatch){
            setErrorMsg({
                userName: '',
                email: '',
                passwd: ''
            });
            const user = {
                name: e.target.userName.value,
                email: e.target.email.value,
                passwd: e.target.passwd.value
            }

            API_Database.signup(user, (result)=>{
                if (result) API_Database.login((user), (result)=>{
                    Cookies.set('session', JSON.stringify(result.data), {sameSite: "strict"});
                    window.location.href = window.location.origin;
                })
            })
        }
        else{
            let msgArray = ['', '', ''];
            (!userNameMatch) ? msgArray[0]='Nom d\'utilisateur incorect':msgArray[0]='';
            (!emailMatch) ? msgArray[1]='email incorect':msgArray[1]='';
            (!passwdMatch) ? msgArray[2]='mot de passe incorrecte minimum 8 caractères, une majuscule et un chiffre':msgArray[2]='';
            setErrorMsg({
                userName: msgArray[0],
                email: msgArray[1],
                passwd: msgArray[2]
            });
        }
    }

    return (
        <form onSubmit={submit}>
            <div className='form_item'>
                <input id='userName' type="text"/>
                <label htmlFor='userName'>Nom d'utilisateur</label>
                <p className='errorMsg'>{errorMsg.userName}</p>
            </div>

            <div className='form_item'>
                <input id='email' type="text"/>
                <label htmlFor='email'>email</label>
                <p className='errorMsg'>{errorMsg.email}</p>
            </div>

            <div className='form_item'>
                <input id='passwd' type="password"/>
                <label htmlFor='passwd'>mot de passe</label>
                <p className='errorMsg'>{errorMsg.passwd}</p>
            </div>

            <div className='form_item'>
                <input htmlFor='submit' type="submit"/>
            </div>
        </form>
    );
};

export default SignUp;