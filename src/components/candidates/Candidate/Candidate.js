import React from 'react';
import './Candidate.css';

export default function Candidate({ party }) {
    return (
        <div className='candidate'>
            <div className='candidate-item' onClick={() => window.location.href = party.manifesto}>
                <p>{party.name}</p>
                {
                    party.symbol
                        ? <img src={party.symbol} alt={party.name} />
                        : <div />
                }
            </div>
            <button>&nbsp;</button>
        </div>
    );
}
