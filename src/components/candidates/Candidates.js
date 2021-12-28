import React from 'react';
import './Candidates.css';
import Candidate from './Candidate/Candidate';
import data from '../../constants/data.js';
import { Link } from 'react-router-dom';

export default function Candidates() {

    var parties = data;

    return (
        <div className='candidates'>
            <h4>Kindly Select the Candidate you want to Vote for</h4>
            <hr />
            {
                parties.map((party, i) => <Candidate key={i} party={party} />)
            }
            <button>
                <Link to="/success" style={{ textDecoration: 'none', color: 'white' }}>
                    Proceed
                </Link>
            </button>
        </div>
    );
}
