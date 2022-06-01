import React from 'react';
import './Candidates.css';
import Candidate from './Candidate/Candidate';
import Success from '../success/Success.js';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { firebase } from '../../firebase';
import CONTRACT_ADDRESS from '../../constants/contract-data.js';
import { ethers } from 'ethers';
import Voting from '../../artifacts/contracts/Voting.sol/Voting.json';

export default function Candidates({ vid, phone, parties, requestAccount }) {

    const navigate = useNavigate();

    const [vote, setVote] = useState();

    const [successFlag, setSuccessFlag] = useState(false);

    const configureCaptcha = () => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
            'callback': (_) => {
                onSignInSubmit();
            },
            defaultCountry: "IN"
        });
    }

    const acceptPasscode = () => {
        const _passcode = prompt("Enter a secret Passcode that you will use to track your vote(6 characters)");

        if (_passcode != null && _passcode.length > 5) {
            onSignInSubmit(_passcode);
        }
        else {
            navigate("/error/4", { replace: true });
        }
    }

    const onSignInSubmit = (_passcode) => {
        configureCaptcha();

        const phoneNumber = "+91" + phone;

        const appVerifier = window.recaptchaVerifier;

        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;

                let code = prompt("Enter OTP sent to your registered mobile number ***** **" + phone.slice(phone.length - 3));

                if (code != null) {
                    window.confirmationResult.confirm(code).then((res) => {
                        submitVote(_passcode).then((_) => {
                            setSuccessFlag(true);
                        }).catch((e) => {
                            navigate("/error/6", { replace: true });
                        });
                    })
                        .catch((e) => {
                            navigate("/error/2", { replace: true });
                        });
                }
                else {
                    navigate("/error/3", { replace: true });
                }

            });
    }

    async function submitVote(_passcode) {
        if (typeof window.ethereum !== 'undefined') {

            await requestAccount();

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            const contract = new ethers.Contract(CONTRACT_ADDRESS, Voting.abi, signer);

            const transaction = await contract.vote(vote, vid, _passcode);
            await transaction.wait();
        }
    }

    return (
        <>
            {
                successFlag
                    ? <Success />
                    : <div className='candidates'>
                        <h4>Kindly Select the Candidate you want to Vote for</h4>
                        <hr />
                        {
                            parties.map((party, i) =>
                                <Candidate
                                    key={i}
                                    party={party}
                                    vote={vote}
                                    setVote={setVote}
                                />)
                        }
                        <div id="sign-in-button"></div>
                        <button disabled={vote == null} onClick={acceptPasscode}>
                            Proceed
                        </button>
                    </div>
            }
        </>
    );
}
