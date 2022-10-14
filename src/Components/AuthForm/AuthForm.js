import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios'
import './AuthForm.css';

const AuthForm = (props) => {
    const { verify } = props;
    const [email, setEmail] = useState('')
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
                notify({ message: 'Email sent! Keep this window open and check for your password.' })
                setEmail('')
                setShowEmailForm(false)
            })
            .catch(err => {
                notify({ message: `Error sending your password! ${err}`, error: true })
                console.log(err)
                setEmail('')
            })
    }

    const submitPassword = () => {
        axios
            .post(process.env.REACT_APP_API_URL + '/otp/verify', { sessionId: sessionId, token: password }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((response) => {
                const { data } = response;
                if (data.message == 'Validated') {
                    verify()
                } else {
                    notify({ message: `Error validating your password! ${err}`, error: true })
                    console.log(err)
                    setPassword('')
                }
            })
            .catch(err => {
                notify({ message: `Error validating your password! ${err}`, error: true })
                console.log(err)
                setPassword('')
            })
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
                    value={showEmailForm ? email : password}
                    onChange={e => setFunction(e.target.value)}
                    placeholder={showEmailForm ? "email" : "password"} />
                <button onClick={() => submitFunction(showEmailForm ? email : password)}>Click here</button>
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
