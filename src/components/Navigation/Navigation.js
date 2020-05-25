import React from 'react';

const Navigation = ({ isLoggedIn, onStageChange }) => {
    if (isLoggedIn) {
        return (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p onClick={() => onStageChange('logOut')} className='f3 link dim black underline pa3 pointer'>Log Out</p>
            </nav>
        );
    } else {
        return (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p onClick={() => onStageChange('signIn')} className='f3 link dim black underline pa3 pointer'>Log In</p>
                <p onClick={() => onStageChange('register')} className='f3 link dim black underline pa3 pointer'>Register</p>
            </nav>
        );
    };
};

export default Navigation;