import React from 'react';
import './Results.css';
import contract_address from '../../constants/contract-data.js';
import { ethers } from 'ethers';
import Voting from '../../artifacts/contracts/Voting.sol/Voting.json';
import { useEffect, useState } from 'react';

function Results({ parties }) {

    const [res, setRes] = useState([]);

    useEffect(() => {
        getResults();
    }, []);

    async function getResults() {
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(contract_address, Voting.abi, provider)
            try {
                const data = await contract.results();
                setRes(data);
            } catch (err) {
                console.log("results Error: ", err)
            }
        }
    }

    return (
        <div className='results'>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Symbol</th>
                        <th>Votes</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        parties.map((party, i) => {
                            return (
                                <tr key={i}>
                                    <td>{party.name}</td>
                                    <td><img src={party.symbol} alt="" /></td>
                                    <td>{res.length === 0 ? "-" : parseInt(res[i].voteCount, 16)}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Results;