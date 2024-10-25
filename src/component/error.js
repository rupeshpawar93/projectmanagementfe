'use strict'

import React from 'react';
import errorImg from '../images/How-to-Fix-500-Internal-Server-Error.png';

const Error = () => {
    return <div>
        <img src={errorImg} alt="error" style={{width: '100%'}}/>
    </div>
}

export default Error;