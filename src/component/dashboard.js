'use strict'

import React, { useEffect, useState } from 'react';
import { FetchAPI } from '../utilities/apiCall';
import { Loader } from '../reuseable-component';
import Card from '../reuseable-component/card';

const Dashboard = () => {
    const [loading, setLoading] = useState(false);
    const [ metrics, setMetrics] = useState([]);
    useEffect(()=> {
        fetchMetrics();
    }, []);

    const fetchMetrics = async () => {
        const response  = await FetchAPI('project/metrics', 'GET', {}, true);
        const data = await response.json();
        if(response.status === 200) {
            console.log(data);
            setMetrics(data.data.metrics)
        }
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <h2 className="text-center my-4">Dashboard & Metrics</h2>
                {
                    metrics.length>0 && metrics.map(metric => {
                        return <Card key={metric.project_id} metric={metric} />
                    })
                }
            </div>

            { loading && <Loader />}

        </div>
    )

}

export default Dashboard;