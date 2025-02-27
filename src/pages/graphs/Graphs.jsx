import React from 'react';
import MyPlot from './MyPlot';
import "./graphs.css"

const Graphs = () => {

    return (
        <div className='graphs'>
            <div className="plot p1">
                <div className="heading">Graphs</div>
                <div className="plot-container">
                    <MyPlot id="0" title="Accelerometer" />
                    <MyPlot id="1" title="Descent Rate" />
                    <MyPlot id="2" title="Altitude" />
                    <MyPlot id="3" title="Pressure" />
                    <MyPlot id="4" title="Temperature" />
                    <MyPlot id="5" title="Vibrations" />
                    <MyPlot id="6" title="Gas Level" />

                </div>
            </div>
        </div>

    );
};

export default Graphs;