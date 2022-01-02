import React from 'react';
import './Error.css';
import { useParams } from 'react-router-dom';

export default function Error() {

    const { id } = useParams();

    const errorMsgs = [
        "Invalid Voter ID",
        "Error Confirming OTP, try fresh",
        "Failed to confirm OTP, try fresh",
        "Passcode can't be less than 6 characters, try fresh",
        "You have already voted!"
    ];

    return (
        <div className='error'>
            <h3>Oops...</h3>
            <div className='error-msg'>
                <p>{errorMsgs[id - 1]}</p>
            </div>
        </div>
    )
}
