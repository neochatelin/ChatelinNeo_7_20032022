import React from 'react';
import Login from '../layouts/Login'
import SignUp from '../layouts/SignUp'

const Connection = () => {
    const [elementForm, setElementForm] = React.useState('login');

    return (
        <div className='Connection_page'>
            <div className='form_container'>
                <img src='./asset/icon-left-font.svg' alt='icon-left-font'/>
                <nav>
                    <div className={'nav_items' + (elementForm === 'login' ? ' active':'') }>
                        <p id='login' onClick={(e)=>{setElementForm('login')}}>se connecter</p>
                    </div>
                    <div className={'nav_items' + (elementForm !== 'login' ? ' active':'')}>
                        <p id='signUp' onClick={(e)=>{setElementForm("signUp")}}>s'inscrire</p>
                    </div>
                </nav>
                <div className='formulaire'>
                    {elementForm === 'login' ? <Login/> : <SignUp/>}
                </div>
            </div>
        </div>
    );
};

export default Connection;