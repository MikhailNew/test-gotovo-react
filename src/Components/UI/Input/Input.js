import React from 'react';
import './Input.css';
import { Widget } from "@uploadcare/react-widget";

function isInvalid({valid, touched, shouldValidate}) {
    return !valid && shouldValidate && touched
}

const Input = props => {
    const inputType = props.type || "text"
    const cls = ["Input"]
    const htmlFor = `${inputType}-${Math.random()}`

    if (isInvalid(props)) {
        cls.push("invalid")
    }

    return (
        <div className = {cls.join(' ')}>
            <label htmlFor={htmlFor}>{props.label}</label>
            {/* {
                inputType === 'file'
                ? <>
                    <label htmlFor='file'>Фото блюда</label>
                    <Widget 
                        publicKey='30506db15e8554c1cad3' 
                        id='file' 
                        data-images-only
                        data-image-shrink="180x180"
                        onChange={props.onChange}
                    />
                  </>
                : <input 
                    type={inputType}
                    id={htmlFor}
                    value={props.value}
                    onChange={props.onChange}
                  />
            }  */}
            <input 
                type={inputType}
                id={htmlFor}
                value={props.value}
                onChange={props.onChange}
            />
            {
                isInvalid(props)
                ? <span>{props.errorMessage || "Введите корректные значения"}</span>
                : null 
            }
        </div>
    )
}

export default Input