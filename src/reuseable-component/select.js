
'use strict'

import React from "react";

const Select = (props) => {
    const { name, id,set, options, class: classSelect, value, defaultValue = 'Select Role', multiple=false} = props;
    return (
    <select multiple={multiple === 'true' ? true: false} name={name} id={id} className={classSelect} value={value}  onChange={(e) => set(event.target.value)} required>
        <option value=''>{defaultValue}</option>
        {
            Object.keys(options).map((key, index)=> {
                return <option key={index} value={key}>{options[key]}</option>
            })
        }
  </select>
  )
}

export default React.memo(Select);