import Cookies from 'js-cookie';
import React from 'react';

const Deconnection = () => {
    const deconnection = ()=>{Cookies.remove('session');}
    return (
        <button style={{
            color: 'white',
            backgroundColor: '#FD2D01',
            padding: '10px',
            borderRadius: '15px',
            margin: '15px',
            border: 'none',
            fontSize: '16px',
            marginRight: 'auto'}} onClick={()=>{deconnection()}}/>
    );
};

export default Deconnection;