import React from 'react';
import './Voter-Id.css';
import { Link } from 'react-router-dom';

export default function VoterId() {
    return (
        <div className='voterId'>
            <form>
                <h4>Enter Your Voter ID</h4>
                <input type="text" />
                <button>
                    <Link to="/candidates" style={{ textDecoration: 'none', color: 'white' }}>
                        Proceed
                    </Link>
                </button>
            </form>
        </div>
    );
}
