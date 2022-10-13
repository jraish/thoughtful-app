import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios'
import './AuthForm.css';

const AuthForm = () => {
    const [email, setEmail] = useState('email')
    const [password, setPassword] = useState('')
    const [showEmailForm, setShowEmailForm] = useState(true)
    const [sessionId, setSessionId] = useState(null)

    const submitEmail = () => {
        axios
            .post(process.env.REACT_APP_API_URL + '/otp/generate_password', { email: email }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((response) => {
                setSessionId(response.data.data.token)
                notify({ message: 'Email sent!' })
            })
            .catch(err => {
                notify({ message: `Error sending your password! ${err}`, error: true })
                console.log(err)
            })
    }

    const submitPassword = () => {
    }

    const setFunction = showEmailForm ? setEmail : setPassword;
    const submitFunction = showEmailForm ? submitEmail : submitPassword;

    const notify = ({ message, error = false }) => {
        error ?
            toast.error(message, {
                position: toast.POSITION.TOP_CENTER
            }) : toast.success(message, {
                position: toast.POSITION.TOP_CENTER
            })
    };

    return (
        <div className="AuthForm">
            <div className="custom-form">
                <p>
                    {showEmailForm ?
                        "Enter your email below to get your one-time password." :
                        "Enter the one-time password you were sent."}
                </p>
                <input
                    type="text"
                    // value={showEmailForm ? email : password}
                    onChange={e => setFunction(e.target.value)}
                    placeholder={showEmailForm ? "email" : "password"} />
                <button onClick={() => submitFunction(email)}>Click here</button>
                <div>
                    <p>
                        {showEmailForm ?
                            "Already have your password?" :
                            "Haven't submitted your email yet?"}
                    </p>
                    <button onClick={() => { setShowEmailForm(!showEmailForm) }}>Click here</button>
                </div>
            </div>
        </div>
    );
}

export default AuthForm;
