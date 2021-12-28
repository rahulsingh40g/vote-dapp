import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <div className='footer'>
            <Link to="/error" style={{ textDecoration: 'none', color: 'white' }}>
             Results
            </Link>
        </div>
    );
}
