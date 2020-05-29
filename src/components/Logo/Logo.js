import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png';
import './Logo.css';

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className='Tilt br2 shadow-2' options={{max: 57}} style={{width: 150, height: 150}}>
                <div className='Tilt-inner pa3'>
                    <img style={{paddingTop: '5px'}} src={brain} alt='SmartBrain Logo' />
                </div>
            </Tilt>
        </div>
    );
};

export default Logo;