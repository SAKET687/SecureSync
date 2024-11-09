/* eslint-disable no-unused-vars */
import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className='footer'>
            <div className="footer-content">
                <p>© 2024 SecureSync. All rights reserved.</p>
                <div className="footer-links">
                    <a href="/about" className="footer-link">About Us</a>
                    <a href="/privacy" className="footer-link">Privacy Policy</a>
                    <a href="/terms" className="footer-link">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
