import React from 'react';

const Option = () => {
    const optionMenu = ()=>{}
    return (
        <button style={{
            color: 'white',
            backgroundColor: '#FD2D01',
            padding: '10px',
            borderRadius: '15px',
            margin: '15px',
            border: 'none',
            fontSize: '16px',
            marginRight: 'auto'}} onClick={()=>{optionMenu()}}/>
    );
};

export default Option;