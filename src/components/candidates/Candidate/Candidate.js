import React from 'react';
import './Candidate.css';
import { useState } from 'react';
import BEEP_URL from '../../../constants/audio-data';

export default function Candidate({ party, vote, setVote }) {

    const [audio] = useState(new Audio(BEEP_URL));

    const handleClick = () => {
        setVote(party.id);
        audio.play();
    }

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
                onClick={handleClick}
                style={{ backgroundColor: (vote === party.id) ? 'green' : 'white' }}>&nbsp;</button>
        </div>
    );
}
