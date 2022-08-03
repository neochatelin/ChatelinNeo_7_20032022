import React from 'react';
import Login from '../layouts/Login'
import SignUp from '../layouts/SignUp'

const Connection = () => {
    const [elementForm, setElementForm] = React.useState('login');

    return (
        <div className='Connection_page'>
            <div className='form_container'>
                <img src='./asset/icon-left-font.svg' alt='icon-left-font'/>
                <nav onChange={(e)=>setElementForm(e.target.value)}>
                    <div className={elementForm === 'login' ? 'active_nav_items' : 'nav_items'}>
                        <input type="radio" name="typeForm" value="login" id='login' defaultChecked/>
                        <label htmlFor='login'>se connecter</label>
                    </div>
                    <div className={elementForm === 'login' ? 'nav_items' : 'active_nav_items'}>
                        <input type="radio" name="typeForm" value="signUp" id='signUp'/>
                        <label htmlFor='signUp'>s'inscrire</label>
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