import React from 'react';
import logo from '../../images/logo.jpg'
import facebook from '../../images/facebook.png';
import instagram from '../../images/instagram.png';
import twitter from '../../images/twitter.png';
import github from '../../images/github.png';

function Footer() {
    return (  
        <div className='footer'>
            <div className='footer_container'>
                <div className='footer_logo'>
                    <img src={logo} alt='logo.jpg'/>
                </div>
                <div className='footer_contact'>
                    <h1>Contact Us</h1>
                    <h4>Hp :</h4>
                    <h4>E-mail :</h4>
                </div>
                <div className='footer_sns'>
                    <img src={facebook} alt="facebook.png"/>
                    <img src={instagram} alt="instagram.png"/>
                    <img src={twitter} alt="twitter.png"/>
                    <img src={github} alt="github.png"/>
                </div>
            </div>
        </div>
    );
}

export default Footer;