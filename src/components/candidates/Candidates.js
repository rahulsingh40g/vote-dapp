import React from 'react';
import './Candidates.css';
import Candidate from './Candidate/Candidate';
import partiesData from '../../constants/parties-data.js';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import firebase from '../../firebase';

export default function Candidates() {

    const navigate = useNavigate();

    var parties = partiesData;

    const [vote, setVote] = useState("");

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

    const onSignInSubmit = () => {
        configureCaptcha();

        const phoneNumber = "+916280421087";

        const appVerifier = window.recaptchaVerifier;

        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                console.log("OPT SENT");

                let code = prompt("Enter OTP sent to your registered mobile number");
                console.log("Code from Prompt: ", code);
                if (code != null) {
                    window.confirmationResult.confirm(code).then((res) => {
                        console.log("Complete Success");
                        navigate('/success');
                    })
                        .catch((error) => {
                            console.log("Error Confirming OTP");
                            navigate("/error");
                        });
                }

            }).catch((error) => {
                console.log("SMS not SENT");
            });
    }

    return (
        <div className='candidates'>
            <h4>Kindly Select the Candidate you want to Vote for</h4>
            <hr />
            {
                parties.map((party, i) => <Candidate key={i} party={party} vote={vote} setVote={setVote} />)
            }
            <div id="sign-in-button"></div>
            <button disabled={vote === ""} onClick={onSignInSubmit}>
                Proceed
            </button>
        </div>
    );
}
