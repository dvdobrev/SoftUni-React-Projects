import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../contexts/UserContext";
import * as userServices from "../services/userServices";

import styles from "../imported-elements/css/global-stayles.module.css";
import loginRegisterCSS from "../imported-elements/css/loginRegisterCSS.module.css";


//TODO: Remove unnecessary code
export const Register = () => {

    const { userDataHandler } = useContext(UserContext);
    const navigate = useNavigate();

    const [error, setError] = useState({
        firstnameErrorMessage: '',
        lastnameErrorMessage: '',
        emailErrorMessage: '',
        passwordErrorMessage: '',
        matchPasswordErrorMessage: '',
        comment: '',
    });

    const [password, setPassword] = useState({
        password: '',
        repeatPassowrd: ''
    });

    const onSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const email = formData.get('email');
        const password = formData.get('password');
        const repeatPassword = formData.get('repeatPassword');
        const firstName = formData.get('firstName');
        const lastName = formData.get('lastName');
        const city = formData.get('city');


        console.log(email);
        console.log(password);
        console.log(email);
        console.log(firstName);
        console.log(lastName);

        if (password !== repeatPassword) {
            return;
        }

        userServices.register(email, password, firstName, lastName, city)
        .then(userData => {
            userDataHandler(userData);
            return userServices.saveUserData(firstName, lastName, city);
        })
        .then(() => {
            navigate('/');
        });        
    }

    const firstnameValidation = (e) => {
        const name = e.target.value;
        let message = '';

        if (name.length < 2 || name.length > 16) {
            message = 'The firstname must be between 2 and 16 characters'
        }

        setError(state => ({
            ...state,
            firstnameErrorMessage: message,
        }));
    }

    const lastnameValidation = (e) => {
        const name = e.target.value;
        let message = '';

        if (name.length < 2 || name.length > 16) {
            message = 'The lastname must be between 2 and 16 characters'
        }

        setError(state => ({
            ...state,
            lastnameErrorMessage: message,
        }));
    }

    const emailValidation = (e) => {
        const email = e.target.value;
        let message = '';
        const regex = /^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!regex.test(email)) {
            message = 'The email must contain only characters, digits, ".", "-" or "_"';
        }

        setError(state => ({
            ...state,
            emailErrorMessage: message,
        }));
    };


    // TODO: Check if there is possible to submit form with empty password,email ...
    //TODO: Search and delete the console.log in whole project -> crl + shft + H
    //TODO: Change the city validator

    const passwordValidation = (e) => {
        const password = e.target.value;
        let errorMessage = '';

        if (password.length < 6 || password.length > 20) {
            errorMessage = 'The passowrd must be between 6 and 20 characters'
        }

        setError(state => ({
            ...state,
            passwordErrorMessage: errorMessage,
        }));

        setPassword(state => ({
            ...state,
            password: password
        }))
    }

    const repeatPasswordValidation = (e) => {
        const repeatPassword = e.target.value;
        let errorMessage = '';

        setPassword(state => ({
            ...state,
            repeatPassowrd: repeatPassword
        }));

        if (password.password === '') {
            setPassword(state => ({
                ...state,
                password: '',
            }));
        }


        if (password.password !== repeatPassword) {
            errorMessage = 'Passwords don\'t macht';
        }

        setError(state => ({
            ...state,
            matchPasswordErrorMessage: errorMessage,
        }));
    }


    return (

        <div className={loginRegisterCSS["registerContainer"]}>
            <h1>Sign Up </h1>

            <form onSubmit={onSubmit}>

                {/* <label htmlFor="firstName">First name</label>
            <div className="input-wrapper">
                <span><i className="fa-solid fa-user"></i></span>
                <input id="firstName" name="firstName" type="text" value={values.firstName} onChange={changeHandler} onBlur={(e) => minLength(e, 3)} />
            </div>
            {errors.firstName &&
                <p className="form-error">
                    First name should be at least 3 characters long!
                </p>
            } */}

                <div className="form-outline mb-0">
                    <div className="form-outline">

                        <input
                            type="text"
                            name="firstName"
                            size={30}
                            placeholder="First Name"
                            onBlur={firstnameValidation}
                        />

                        {error.firstnameErrorMessage &&
                            <div style={{ color: 'white' }}>{error.firstnameErrorMessage}</div>
                        }

                        <br />
                        <br />

                    </div>
                </div>

                <div className="form-outline mb-0">
                    <div className="form-outline">
                        <input
                            type="text"
                            name="lastName"
                            size={30}
                            placeholder="Last Name"
                            onBlur={lastnameValidation}
                        />

                        {error.lastnameErrorMessage &&
                            <div style={{ color: 'white' }}>{error.lastnameErrorMessage}</div>
                        }

                        <br />
                        <br />
                    </div>
                </div>
                    
                <div className="form-outline mb-0">
                    <div className="form-outline">
                        <input
                            type="text"
                            name="city"
                            size={30}
                            placeholder="City"
                            onBlur={lastnameValidation}
                        />

                        {error.lastnameErrorMessage &&
                            <div style={{ color: 'white' }}>{error.lastnameErrorMessage}</div>
                        }

                        <br />
                        <br />
                    </div>
                </div>

                <div className="form-outline mb-0">
                    <div className="form-outline">
                        <input
                            type="email"
                            name="email"
                            size={30}
                            placeholder="Email"
                            onBlur={emailValidation}
                        />

                        {error.emailErrorMessage &&
                            <div style={{ color: 'white' }}>{error.emailErrorMessage}</div>
                        }

                        <br />
                        <br />
                    </div>
                </div>

                <div className="form-outline mb-0">
                    <div className="form-outline">
                        <input
                            type="password"
                            name="password"
                            size={30}
                            placeholder="Password"
                            onBlur={passwordValidation}
                        />

                        {error.passwordErrorMessage &&
                            <div style={{ color: 'white' }}>{error.passwordErrorMessage}</div>
                        }
                        <br />
                        <br />
                    </div>
                </div>

                <div className="form-outline mb-0">
                    <div className="form-outline">
                        <input
                            type="password"
                            name="repeatPassword"
                            size={30}
                            placeholder="Repeat Password"
                            onBlur={repeatPasswordValidation}
                        />
                        {error.matchPasswordErrorMessage &&
                            <div style={{ color: 'white' }}>{error.matchPasswordErrorMessage}</div>
                        }

                        <br />
                        <br />
                    </div>
                </div>

                <button type="text" name="firstName"> Sign up </button>

            </form>
        </div>
    );
};