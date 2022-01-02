import React from 'react';
import './Candidates.css';
import Candidate from './Candidate/Candidate';
import Success from '../success/Success.js';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { firebase } from '../../firebase';
import contract_address from '../../constants/contract-data.js';
import { ethers } from 'ethers';
import Voting from '../../artifacts/contracts/Voting.sol/Voting.json';

export default function Candidates({ vid, phone, parties }) {

    const navigate = useNavigate();

    const [vote, setVote] = useState();

    const [successFlag, setSuccessFlag] = useState(false);

    const [passcode, setPasscode] = useState("");

    const configureCaptcha = () => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
            'callback': (response) => {
                onSignInSubmit();
                console.log("Recaptcha Verified");
            },
            defaultCountry: "IN"
        });
    }

    const acceptPasscode = () => {
        const _passcode = prompt("Enter a secret Passcode that you will use to track your vote(6 characters)");

        if (_passcode != null && _passcode.length > 5) {
            setPasscode(_passcode);
            onSignInSubmit();
        }
        else {
            navigate("/error/4", { replace: true });
        }
    }

    const onSignInSubmit = () => {
     /*   configureCaptcha();

        const phoneNumber = "+91" + phone;

        const appVerifier = window.recaptchaVerifier;

        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                console.log("OPT SENT");

                let code = prompt("Enter OTP sent to your registered mobile number ***** **" + phone.slice(phone.length - 3));
                console.log("Code from Prompt: ", code);
                if (code != null) {
                    window.confirmationResult.confirm(code).then((res) => {*/
                        submitVote();
                        console.log("Complete Success");
                        setSuccessFlag(true);
              /*      })
                        .catch((error) => {
                            console.log("Error Confirming OTP");
                            navigate("/error/2", { replace: true });
                        });
                }
                else {
                    navigate("/error/3", { replace: true });
                }

            }).catch((error) => {
                console.log("SMS not SENT");
            });*/
    }

    async function requestAccount() {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
    }

    async function submitVote() {
        if (typeof window.ethereum !== 'undefined') {
            await requestAccount();
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            console.log({ provider });
            const signer = provider.getSigner();
            console.log('signer: ', signer);
            const contract = new ethers.Contract(contract_address, Voting.abi, signer);
            const transaction = await contract.vote(vote, vid, passcode);
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
                            parties.map((party, i) => <Candidate key={i} party={party} vote={vote} setVote={setVote} />)
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
