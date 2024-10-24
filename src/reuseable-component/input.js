'use strict'

import React from "react";


const Input = (props) => {
    const { type, name, class: inputClass, set , required, minlength=6, maxlength=15, id , value=''} = props;
    return <input type={type} id={id} name={name} className={inputClass} value={value} onChange={(e) => set(e.target.value)} minLength={minlength} maxLength={maxlength}  required={required === "true"}  />
}

export default React.memo(Input);