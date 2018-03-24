import React from 'react';
import BarChart from './chart';

class Main extends React.Component {
    render() {
        const data = [
            { year: 2012, percent: 50 },
            { year: 2013, percent: 30 },
            { year: 2014, percent: 80 },
            { year: 2015, percent: 20 },
            { year: 2016, percent: 55 },
            { year: 2017, percent: 83 },
        ];
        return (
            <div style={{ height: '80%' }} >
                <BarChart data={data} />
            </div>
        );
    }
}

export default Main;

