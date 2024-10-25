'use strict'

import React from "react";

const Label = (props) => {
    const { class: classLabel, forId, text } = props;
    return (
        <label className={classLabel} htmlFor={forId}>{text}</label>
    )
}

export default React.memo(Label);