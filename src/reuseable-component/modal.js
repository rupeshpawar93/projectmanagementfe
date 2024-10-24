'use strict'

import React from "react";

const withModal = (Component) => {
    return function({ showModal, clickHandle, ...props }) {

        return (
            <>
                <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }}>
                    <div className="modal-dialog modal-lg"> {/* Use Bootstrap's modal-lg for larger size */}
                        <div className="modal-content p-5">
                            <div className="modal-header">
                                <h4 className="modal-title">Add/Update</h4>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={clickHandle}></button>
                            </div>

                            <div className="modal-body">
                                <Component {...props} clickHandle={clickHandle}/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={clickHandle}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                {showModal && <div className="modal-backdrop fade show"></div>}
            </>
        );
    }
}

export default withModal;
