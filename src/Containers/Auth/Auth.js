import React, {Component} from 'react';
import './Auth.css'
import Button from '../../Components/UI/Button/Button';
import Input from '../../Components/UI/Input/Input';
import { connect } from 'react-redux';
import {auth} from '../../store/actions/auth'
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

function validatePhone (phoneNumber) {
    const re = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11}(\s*)?$/;
    return re.test(String(phoneNumber).toLowerCase());
}

var firebaseConfig = {
    apiKey: "AIzaSyDhzobILNikqMFFaW4RMERuSBEKsbWbOQ4",
    authDomain: "gotovo-db.firebaseapp.com",
    databaseURL: "https://gotovo-db.firebaseio.com",
    projectId: "gotovo-db",
    storageBucket: "gotovo-db.appspot.com"
};
  
firebase.initializeApp(firebaseConfig, console.log('OK'));

class Auth extends Component {

    state = {
        isFormValid: false,
        isValid: true,
        formControls: {
            phone: {
                value: '',
                type: 'phone',
                label: 'Номер телефона',
                errorMessage: 'Введите корректно номер телефона',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    phone: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Пароль',
                errorMessage: 'Введите корректный пароль',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    }

    componentDidMount () {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    }

    logHandler = () => {
        var phoneNumber = this.state.formControls.phone.value;
        var appVerifier = window.recaptchaVerifier;
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then(function (confirmationResult) {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
            }).catch(function (error) {
            // Error; SMS not sent
            // ...
        });
        // this.props.auth(
        //     this.state.formControls.phone.value,
        //     this.state.formControls.password.value,
        //     true
        // )
    }

    registerHandler = () => {
        this.props.auth(
            this.state.formControls.phone.value,
            this.state.formControls.password.value,
            false
        )
    }

    submitHandler = event => {
        event.preventDefault()
    }

    validateControl (value, validation) {
        if (!validation) {
            return true
        }
        
        let isValid = true

        if (validation.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (validation.phone) {
            isValid = validatePhone(value) && isValid
        }

        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }

        return isValid
    }

    onChangeHandler = (event, controlName) => {
        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]}

        control.value = event.target.value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)
        formControls[controlName] = control
        let isFormValid = true

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })
        
        this.setState({
            formControls, isFormValid
        })
    }

    renderInputs () {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]
            return (
                <Input 
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    label={control.label}
                    errorMessage={control.errorMessage}
                    valid={control.valid}
                    touched={control.touched}
                    shouldValidate={!!control.validation}
                    onChange={event => this.onChangeHandler(event, controlName)}
                />
            )
        })
    }

    render () {
        return (
            <div className = "Auth">
                <div>
                    <h1>Авторизация</h1>
                    <form className = "AuthForm" onSubmit={this.submitHandler}>
                        {this.renderInputs()}
                        <Button onClick={this.logHandler} type="success" disabled={!this.state.isFormValid}>Войти</Button>
                        {/* <Button onClick={this.registerHandler} type="primary" disabled={!this.state.isFormValid}>Зарегистрироваться</Button> */}
                    </form>
                    <div id="recaptcha-container"></div>
                </div>
            </div>
            
        )
    }
}

function mapDispatchToProps (dispatch) {
    return {
        auth: (phone, password, isLogin) => dispatch(auth(phone, password, isLogin))
    }
}

export default connect(null, mapDispatchToProps)(Auth)