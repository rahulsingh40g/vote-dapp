import React from 'react';
import './Voter-Id.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import votersData from '../../constants/voter-list';

export default function VoterId() {

    const navigate = useNavigate();
    const vids = votersData.map(voter => voter.voterId);
    const [vid, setVid] = useState("");

    const validateVid = () => {
        if (vids.includes(vid)) {
            navigate("/candidates");
        }
        else {
            navigate("/error");
        }
    }

    return (
        <div className='voterId'>
            <form>
                <h4>Enter Your Voter ID</h4>
                <input type="text" onChange={e => setVid(e.target.value)} />
                <button onClick={validateVid}>Proceed</button>
            </form>
        </div>
    );
}
