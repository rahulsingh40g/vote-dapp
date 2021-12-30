import React from 'react';
import './Voter-Id.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Candidates from '../candidates/Candidates.js';
import { db } from '../../firebase';

export default function VoterId() {

    const navigate = useNavigate();
    const [vid, setVid] = useState("");
    const [phone, setPhone] = useState("");
    const [voters, setVoters] = useState([]);
    const [fetchingData, setFetchingData] = useState(true);

    useEffect(() => {
        db
            .collection('voters')
            .onSnapshot(snapshot => (
                setVoters(snapshot.docs.map(doc => doc.data()))
            ));

        setFetchingData(false);
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

    return (
        <>
            {
                phone === ""
                    ? <div className='voterId'>
                        <form className='voterId-form'>
                            <h4>Enter Your Voter ID</h4>
                            <input type="text" onChange={e => setVid(e.target.value)} />
                            <button onClick={validateVid} >Proceed</button>
                        </form>
                    </div>
                    : <Candidates vid={vid} phone={phone} />
            }
        </>
    );
}
