import React from 'react';
import './Error.css';
import { useParams } from 'react-router-dom';
import ERROR_MESSAGES from '../../constants/error-data.js';

export default function Error() {

    const { id } = useParams();

    return (
        <div className='error'>
            <h3>Oops...</h3>
            <div className='error-msg'>
                <p>{ERROR_MESSAGES[id - 1]}</p>
            </div>
        </div>
    )
}
