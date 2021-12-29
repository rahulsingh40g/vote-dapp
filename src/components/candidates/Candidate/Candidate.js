import React from 'react';
import './Candidate.css';

export default function Candidate({ party, vote, setVote }) {
    return (
        <div className='candidate'>
            <div className='candidate-item' onClick={() => window.open(party.manifesto, "_blank")}>
                <p>{party.name}</p>
                {
                    party.symbol
                        ? <img src={party.symbol} alt={party.name} />
                        : <div />
                }
            </div>
            <button
                onClick={() => setVote(party.name)}
                style={{ backgroundColor: (vote === party.name) ? 'green' : 'white' }}>&nbsp;</button>
        </div>
    );
}
