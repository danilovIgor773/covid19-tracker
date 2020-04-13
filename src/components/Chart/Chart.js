import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import styles from '../Chart/Chart.module.css';

const Chart = ({ data, country }) => {
    const [dailyData, setDailyData ] = useState([]);

    useEffect(() => {
        const fetchedDailyData = async () => {
            setDailyData(await fetchDailyData());
        }
        fetchedDailyData();
    }, []);
    
    const lineChart = (
        dailyData.length
        ? (
            <ResponsiveContainer>
                <LineChart width={800} height={500} data={dailyData}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Legend />
                    <Line type="monotone" dataKey="confirmed" stroke="#8884d8" activeDot={{r: 8}}/>
                    <Line type="monotone" dataKey="deaths" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
            
        ): null
    );
      
    
    const barChart = (
        data.length
        ? (
            <ResponsiveContainer>                
                <BarChart width={600} height={300} data={data}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend />
                    <Bar dataKey="infected" fill="#0000FF" />
                    <Bar dataKey="recovered" fill="#00FF00" />
                    <Bar dataKey="deaths" fill="#FF0000" />
                </BarChart>
            </ResponsiveContainer>
        ) : null
    );


    return (
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>       
    );
}

export default Chart;

