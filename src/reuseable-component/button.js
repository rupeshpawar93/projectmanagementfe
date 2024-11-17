'use strict'

import React from "react";

const Button = (props) => {
    const { class: buttonClass, type, text, clickHandle, name } = props;
    console.log("-------------clickHandle", clickHandle);
    return (<button name={name} className={buttonClass} type={type} onClick={clickHandle}>{text}</button>)
}

export default React.memo(Button);