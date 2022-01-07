import React, { useState } from 'react';
import './MyVote.css';
import contract_address from '../../constants/contract-data.js';
import { ethers } from 'ethers';
import Voting from '../../artifacts/contracts/Voting.sol/Voting.json';

function MyVote({ requestAccount }) {

    const [passcode, setPasscode] = useState("");
    const [party, setParty] = useState("");

    async function getVotedParty(e) {
        e.preventDefault();
        if (typeof window.ethereum !== 'undefined') {
            await requestAccount();
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contract_address, Voting.abi, signer);

            contract.votedTo(passcode).then((res) => {
                setParty(res);
            }).catch((error) => {
                setParty(error.data.message.split('\'')[1]);
            });
        }
    }

    return (
        <div className='myVotes'>
            <h3>Check whom you voted</h3>
            <form className='myVotes-form'>
                <input
                    type="password"
                    placeholder='Passcode'
                    onChange={(e) => setPasscode(e.target.value)}
                />
                <button onClick={getVotedParty} >Check</button>
            </form>
            <h3>{party === "" ? "" : party}</h3>
        </div>
    );
}

export default MyVote;
