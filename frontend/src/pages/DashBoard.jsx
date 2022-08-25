import Cookies from 'js-cookie';
import React, { useContext } from 'react';
import { useState } from 'react';
import API_Database from '../apis/database';
import DefaultProfilePicture from '../components/DefaultProfilePicture';
import { Context } from '../config/Context';

const DashBoard = () => {
    const {user} = useContext(Context);
    const [profileUser, setProfileUser] = useState(user);
    console.log(profileUser);
    if(!Cookies.get('session')){
        window.location.href = window.location.origin+'/connection';
    }

    const   updateUserProfilePicture = (e)=>{
        new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append( "image", e.target.files[0]);
            API_Database.updateUserProfilePicture(user.id, formData, (res)=>{resolve(res)});
        }).then((res)=>{
            let newUser = user;
            newUser.url_picture = res.data.newImage;
            setProfileUser(newUser);
        });
    },      Deconnection = ()=>{
        localStorage.clear();
        Cookies.remove('session');
        window.location.href = window.location.origin+'/connection';
    },      DeleteAccount = ()=>{
        new Promise((resolve, reject) => {
            API_Database.deleteUser(user.id, ()=>{resolve()});
        }).then(()=>{
            Deconnection();
        })
    };

    return (
        <div className='user'>
            <p className='goBack' onClick={()=>{window.location.href = window.location.origin+'/';}}><img src='./asset/icon-arrow.svg' alt='goBack'/></p>
            <div className='user_container dashboard_profile'>
                <label htmlFor="image"><DefaultProfilePicture user={{...profileUser}}/></label>
                <input type='file' id='image' style={{display: 'none'}} onChange={(e)=>{updateUserProfilePicture(e)}}></input>
                <p className='button' onClick={()=>{Deconnection();}}>déconnexion</p>
                <p className='button' onClick={()=>{DeleteAccount();}}>supprimer compte</p>
            </div>
        </div>
    );
};

export default DashBoard;