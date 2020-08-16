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

let firebaseConfig = {
    apiKey: "AIzaSyDhzobILNikqMFFaW4RMERuSBEKsbWbOQ4",
    authDomain: "gotovo-db.firebaseapp.com",
    databaseURL: "https://gotovo-db.firebaseio.com",
    projectId: "gotovo-db",
    storageBucket: "gotovo-db.appspot.com",
    messagingSenderId: "951230164258",
    appId: "1:951230164258:web:193852e532a90e226c097b"
  }
firebase.initializeApp(firebaseConfig)

class Auth extends Component {

    state = {
        token: null,
        userId: null,
        isLogin: false,
        veriefCode: '',
        errorCode: true,
        signInTouched: false,
        isFormValid: false,
        isValid: true,
        formControls: {
            phone: {
                value: '',
                type: 'phone',
                label: 'Номер телефона, а затем код из смс (формат +7 900 000 00 00)',
                errorMessage: 'Введите корректно номер телефона',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    phone: true
                }
            }
        }
    }

    componentDidMount () {
        firebase.auth().languageCode = 'it';
        this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': response => {
                // reCAPTCHA solved, allow signInWithPhoneNumber
            }
        })
    }

    logHandler = () => {
        this.setState({
            signInTouched: !this.state.signInTouched
        })
        let appVerifier = this.recaptchaVerifier
        let phoneNumber = this.state.formControls.phone.value
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then(confirmationResult => {
                this.confirmationResult = confirmationResult
            }).catch(error => {
                console.log(error)
            })
    }

    veriefierCodeHandler = (event) => {
        if (event.target.value.length === 6) {
            this.confirmationResult.confirm(event.target.value).then(result => {
                let user = result.user
                this.props.auth(user._lat, user.uid, true)
            }).catch(error => {
                this.setState({
                    errorCode: !this.state.errorCode
                })
            });
        }
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
                        <div id="recaptcha-container"></div>
                        {
                            !this.state.signInTouched
                            ? <>
                                {this.renderInputs()}
                                <Button id='sign-in-button' onClick={this.logHandler} type="success" disabled={!this.state.isFormValid}>Получить код</Button>
                              </>
                            : <>
                                <label>Введите код из смс</label><br />
                                <input 
                                    className="input-auth" 
                                    onChange={event => this.veriefierCodeHandler(event)} 
                                    placeholder="0 0 0 0 0 0">
                                </input>
                              </>
                        }
                        {
                            !this.state.errorCode
                            ? <h2 className="error-auth">Неверный код, повторите попытку.</h2>
                            : null
                        }
                    </form>
                </div>
            </div>
            
        )
    }
}

function mapDispatchToProps (dispatch) {
    return {
        auth: (token, userId, isLogin) => dispatch(auth(token, userId, isLogin))
    }
}

export default connect(null, mapDispatchToProps)(Auth)