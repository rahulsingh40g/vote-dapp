import React from 'react';
import './Voter-Id.css';

export default function VoterId() {
    return (
        <div className='voterId'>
            <form>
                <h4>Enter Your Voter ID</h4>
                <input type="text" />
                <button>Proceed</button>
            </form>
        </div>
    );
}
