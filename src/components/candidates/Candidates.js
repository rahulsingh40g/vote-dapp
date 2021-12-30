import React from 'react';
import './Candidates.css';
import Candidate from './Candidate/Candidate';
import Success from '../success/Success.js';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { db, firebase } from '../../firebase';

export default function Candidates({ vid, phone }) {

    const navigate = useNavigate();

    const [parties, setParties] = useState([]);

    const [vote, setVote] = useState("");

    const [successFlag, setSuccessFlag] = useState(false);


    useEffect(() => {
        db
            .collection('parties')
            .onSnapshot(snapshot => (
                setParties(snapshot.docs.map(doc => doc.data()))
            ));
    }, []);

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

        const phoneNumber = "+91" + phone;

        const appVerifier = window.recaptchaVerifier;

        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                console.log("OPT SENT");

                let code = prompt("Enter OTP sent to your registered mobile number ***** **" + phone.slice(phone.length - 3));
                console.log("Code from Prompt: ", code);
                if (code != null) {
                    window.confirmationResult.confirm(code).then((res) => {
                        console.log("Complete Success");
                        setSuccessFlag(true);
                    })
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
            });
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
                        <button disabled={vote === ""} onClick={onSignInSubmit}>
                            Proceed
                        </button>
                    </div>
            }
        </>
    );
}
