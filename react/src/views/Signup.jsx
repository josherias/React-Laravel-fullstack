import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../contexts/ContextProvider";

function Signup() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();

    const [errors, setErrors] = useState(null);

    const { setUser, setToken } = useStateContext();

    const onSubmit = (ev) => {
        ev.preventDefault();

        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        };

        axiosClient
            .post("/signup", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch((err) => {
                const response = err.response;

                //if validation error
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });
    };

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">Signup for free</h1>
                    {errors && (
                        <div className="alert">
                            {Object.keys(errors).map((key) => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    )}

                    <input type="text" ref={nameRef} placeholder="Full name" />
                    <input
                        type="email"
                        ref={emailRef}
                        placeholder="Email Address"
                    />
                    <input
                        type="password"
                        ref={passwordRef}
                        placeholder="Password"
                    />
                    <input
                        type="password"
                        ref={passwordConfirmationRef}
                        placeholder="Password Comfirmation"
                    />
                    <button className="btn btn-block">Signup</button>
                    <p className="message">
                        Already Registered? &nbsp;
                        <Link to="/login">Sign in</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Signup;
