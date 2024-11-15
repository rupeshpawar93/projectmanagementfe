'use strict'

import React from "react";


const Input = (props) => {
    const { type, name, class: inputClass, set, required, minlength = 6, maxlength = 15, id, value = '', max , readonly} = props;
    return <input type={type} id={id} name={name} className={inputClass} value={value} onChange={(e) => set(e.target.value)} minLength={minlength} maxLength={maxlength} required={required === "true"} min={(type == 'date') ? new Date().toISOString().split('T')[0] : ''} max={type == 'date' ? max : ''} readOnly={readonly === "true"}/>
}

export default React.memo(Input);