'use strict';

import React from 'react';

import loaderImg from '../images/animated_loader_gif_n6b5x0.gif'

const Loader = () => {
    return (
        <div className="modal-backdrop fade show" >
            <img src={loaderImg} alt="loader" style={{ position: 'absolute', top: '35%', left: '30%' }} />
        </div>
    )

}

export default Loader;