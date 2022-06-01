import React from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';

export default function Header() {

    const navigate = useNavigate();

    return (
        <div className='header'>
            <div className='header-head'>
                <h3 onClick={() => navigate("/")}>Blockchain Based E-Voting System</h3>
                <button onClick={() => navigate("/myvote")}>My Vote</button>
            </div>
        </div>
    );
}
