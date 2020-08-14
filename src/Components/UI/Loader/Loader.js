import React from 'react'
import './Loader.css'

const Loader = props => (
    <div className="Loader-center">
        <div className="lds-ripple">
            <div />
            <div />
        </div>
    </div>
)

export default Loader