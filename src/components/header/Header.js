import React from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';

export default function Header() {

    const navigate = useNavigate();

    return (
        <div className='header'>
            <div className='header-head'>
                <h3>Blockchain Based E-Voting System</h3>
                <button onClick={() => navigate("/myvote")}>my vote</button>
            </div>
        </div>
    );
}
