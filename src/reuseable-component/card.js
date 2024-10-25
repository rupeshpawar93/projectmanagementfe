'use strict';

import React from "react";

const Card = (props) => {
    const { metric } = props;

    return (
        <div className="col-12 col-md-6 col-lg-4 mb-4">
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">{metric.name}</h4>
                </div>
                <div className="card-body text-white">
                    <ul className="list-unstyled">
                        <li className="d-flex justify-content-start bg-danger pt-3 px-2">
                            <h5 className="card-title">High Priority: </h5>
                            <div className="px-2 list-unstyled d-flex flex-column flex-md-row">
                                <p className="card-text px-1">Feature: {metric.high_priority_feature_count}</p>
                                <p className="card-text px-1">Bug: {metric.high_priority_bug_count}</p>
                                <p className="card-text px-1">Enhancement: {metric.high_priority_enhancement_count}</p>
                            </div>
                        </li>

                        <li className="d-flex justify-content-start bg-warning pt-3 px-2">
                            <h5 className="card-title">Medium Priority: </h5>
                            <div className="px-2 list-unstyled d-flex flex-column flex-md-row">
                                <p className="card-text px-1">Feature: {metric.medium_priority_feature_count}</p>
                                <p className="card-text px-1">Bug: {metric.medium_priority_bug_count}</p>
                                <p className="card-text px-1">Enhancement: {metric.medium_priority_enhancement_count}</p>
                            </div>
                        </li>

                        <li className="d-flex justify-content-start bg-secondary pt-3 px-2">
                            <h5 className="card-title">Low Priority: </h5>
                            <div className="px-2 list-unstyled d-flex flex-column flex-md-row">
                                <p className="card-text px-1">Feature: {metric.low_priority_feature_count}</p>
                                <p className="card-text px-1">Bug: {metric.low_priority_bug_count}</p>
                                <p className="card-text px-1">Enhancement: {metric.low_priority_enhancement_count}</p>
                            </div>
                        </li>

                        <li className="d-flex justify-content-start bg-primary pt-3 px-2">
                            <h5 className="card-title">Status: </h5>
                            <div className="px-2 list-unstyled d-flex flex-column flex-md-row">
                                <p className="card-text px-1">Not Started: {metric.not_Started}</p>
                                <p className="card-text px-1">In Progress: {metric.in_Progress}</p>
                                <p className="card-text px-1">Completed: {metric.completed}</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default React.memo(Card);
