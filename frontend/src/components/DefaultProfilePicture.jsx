import React from 'react';

const DefaultProfilePicture = (props) => {
    const user = props.user;
    const SERVER = `${process.env.REACT_APP_URL}${process.env.REACT_APP_PORT}`;
    if(user.url_picture){
        return(
            <img className='profile_picture' crossOrigin='' src={SERVER+'/images/'+user.url_picture} alt="" />
        );
    }else{
        return(
            <div className='default_profile_picture'>
                <p>{user.name[0].toUpperCase()}</p>
            </div>
        )
    }
};

export default DefaultProfilePicture;