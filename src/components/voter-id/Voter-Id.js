import React from 'react';
import './Voter-Id.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Candidates from '../candidates/Candidates.js';
import { db } from '../../firebase';
import contract_address from '../../constants/contract-data.js';
import { ethers } from 'ethers';
import Voting from '../../artifacts/contracts/Voting.sol/Voting.json';

export default function VoterId({ parties, requestAccount }) {

    const navigate = useNavigate();
    const [vid, setVid] = useState("");
    const [phone, setPhone] = useState("");
    const [voters, setVoters] = useState([]);

    useEffect(() => {
        db
            .collection('voters')
            .onSnapshot(snapshot => (
                setVoters(snapshot.docs.map(doc => doc.data()))
            ));
    }, []);

    const validateVid = () => {
        let flag = false;
        for (let i = 0; i < voters.length; i++) {
            if (voters[i].voterId === vid) {
                setPhone(voters[i].mobNo);
                flag = true;
                break;
            }
        }

        if (!flag) {
            navigate("/error/1");
        }
    }

    async function canVote(e) {
        e.preventDefault();
        if (typeof window.ethereum !== 'undefined') {
            await requestAccount();
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contract_address, Voting.abi, signer);
            try {
                const data = await contract.canVote(vid);
                if (data) validateVid();
                else navigate("/error/5");
            } catch (err) {
                console.log("canVote Error: ", err)
            }
        }
    }

    return (
        <>
            <div className="mainContent">
            <div>
                {
                    phone === ""
                        ? <div className='voterId'>
                            <form className='voterId-form'>
                                <h4>Enter Your Voter ID</h4>
                                <input type="text" onChange={e => setVid(e.target.value)} />
                                <button onClick={canVote} >Proceed</button>
                            </form>
                        </div>
                        : <Candidates
                            vid={vid}
                            phone={phone}
                            parties={parties}
                            requestAccount={requestAccount}
                        />
                }
            </div>
            <div className='voteImage'>
                <img src="votelaptop.jpg"/>
            </div>
        </div>
        </>
    );
}
