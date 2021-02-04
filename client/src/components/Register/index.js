import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import {useAuth} from '../../utils/use-auth';

function Register(props) {
    const {
        isLoggedIn,
        user,
        updateJwt
      } = useAuth();

    const [userState, setUserState] = useState(
        {
            name: "",
            email: "",
            password: "",
            password2: "",
            errors:
            {
                name: "",
                email: "",
                password: "",
                password2: ""
            }
        }
    )

    const onChange = (e) => {
        const newState = {
            ...userState,
            [e.target.id]: e.target.value
        }
        setUserState(newState);
    };

    const submitHandle = (e) => {
        e.preventDefault();
        e.stopPropagation();

        let param = new URLSearchParams();
        param.append('name', userState.name);
        param.append('email', userState.email);
        param.append('password', userState.password);
        param.append('password2', userState.password2);

        // You must need to valide data but I skip in here

        // Send request to the server
        fetch('/api/users/register', {
            method: 'POST',
            body: param
        }).then((res) => {
            return res.json()
        }).then(data => {
            updateJwt(data.token);
        }).catch((err) => {
            console.error(err);
        })
    }

    if (isLoggedIn) {
        return (
            <Redirect
                to={{
                    pathname: '/login',
                    state: { from: props.location }
                }}
            />
        )
    } else {
        return (
            <form noValidate onSubmit={submitHandle}>
                <input
                    onChange={onChange}
                    value={userState.name}
                    error={userState.errors.name}
                    id="name"
                    type="text"
                />
                <label htmlFor="name">Name</label>
                <input
                    onChange={onChange}
                    value={userState.email}
                    error={userState.errors.email}
                    id="email"
                    type="email"
                />
                <label htmlFor="email">Email</label>
                <input
                    onChange={onChange}
                    value={userState.password}
                    error={userState.errors.password}
                    id="password"
                    type="password"
                    pattern=".{6,20}"
                    required
                />
                <label htmlFor="password">Password</label>
                <input
                    onChange={onChange}
                    value={userState.password2}
                    error={userState.errors.password2}
                    id="password2"
                    type="password"
                    pattern=".{6,20}"
                    required
                />
                <label htmlFor="password2">Confirm Password</label>
                <button type="submit">
                    Sign up
            </button>
            </form >
        )
    }
}

export default Register;

