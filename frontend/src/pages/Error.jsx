import React from 'react';


const Error = () => {
    const style = {
        display: 'flex',
        width: '100vw',
        height: '100vh',
        justifyContent: 'center',
        fontWeight: 'bolder',
        fontSize: 200
    }
    return (
        <div id='ERROR_PAGE' style={style}>
            <p>404</p>
        </div>
    );
};

export default Error;