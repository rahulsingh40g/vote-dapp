import React from 'react';
import './Error.css';

export default function Error() {
    return (
        <div className='error'>
            <h3>Oops...</h3>
            <div className='error-msg'>
                <p>Your Voter ID is Invalid</p>
            </div>
        </div>
    )
}
