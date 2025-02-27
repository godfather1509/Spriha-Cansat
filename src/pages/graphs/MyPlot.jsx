import React, { useState, useEffect, useRef } from 'react';
import Plot from 'react-plotly.js';
import "./graphs.css";
import socketIOClient from "socket.io-client";

const MyPlot = (props) => {
    const maxDataPoints = 8;

    const [trace1, setTrace1] = useState({
        x: [],
        y: [],
        type: 'scatter',
        mode: 'lines+markers',
    });

    const [layout, setLayout] = useState({
        width: 450,
        height: 300,
        title: props.title,
        xaxis: {
            range: [0, maxDataPoints],
        },
    });

    const dataRef = useRef([]);
    const xRef = useRef(0);

    useEffect(() => {
        const socket = socketIOClient("http://127.0.0.1:4000/");
        socket.on("message", (newData) => {
            if (newData?.[0]?.[xRef.current]?.[props.id] !== undefined) {
                const newValue = parseFloat(newData[0][xRef.current][props.id]);
                updatePlot(newValue);
            } else {
                updatePlot(Math.random() * 10); // Simulated fallback
            }
            xRef.current += 1;
        });

        return () => socket.disconnect();
    }, []);

    const updatePlot = (newValue) => {
        dataRef.current.push(newValue);
        if (dataRef.current.length > maxDataPoints) {
            dataRef.current.shift(); // Maintain fixed-length data
        }

        setTrace1((prevTrace) => ({
            ...prevTrace,
            x: Array.from({ length: dataRef.current.length }, (_, i) => i + xRef.current - dataRef.current.length + 1),
            y: [...dataRef.current],
        }));

        setLayout((prevLayout) => ({
            ...prevLayout,
            xaxis: {
                range: [xRef.current - maxDataPoints + 1, xRef.current + 1],
            },
        }));
    };

    return (
        <Plot
            data={[trace1]}
            layout={layout}
        />
    );
};

export default MyPlot;
