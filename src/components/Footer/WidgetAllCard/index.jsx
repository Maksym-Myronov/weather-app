import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectTemperatureData } from '../../../feathers/ip/temperatureSlice';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
//Styles
import styles from './index.module.scss';


const WidgetAllCard = ({ forecast }) => {
    const options = useSelector(selectTemperatureData);
    const [speed, setSpeed] = useState(null);
    const [storedForecast, setStoredForecast] = useState(null);
    const [dataTime, setDataTime] = useState(null)

    const data = [
        {
            name: dataTime && dataTime[0],
            uv: 4000,
            pv: storedForecast && storedForecast[0],
            amt: 2400
        },
        {
            name: dataTime && dataTime[1],
            uv: 3000,
            pv: storedForecast && storedForecast[1],
            amt: 2210
        },
        {
            name: dataTime && dataTime[2],
            uv: 2000,
            pv: storedForecast && storedForecast[2],
            amt: 2290
        },
        {
            name: dataTime && dataTime[3],
            uv: 2780,
            pv: storedForecast && storedForecast[3],
            amt: 2000
        },
        {
            name: dataTime && dataTime[4],
            uv: 1890,
            pv: storedForecast && storedForecast[4],
            amt: 2181
        },
        {
            name: dataTime && dataTime[5],
            uv: 2390,
            pv: storedForecast && storedForecast[5],
            amt: 2500
        },
        {
            name: dataTime && dataTime[6],
            uv: 3490,
            pv: storedForecast && storedForecast[6],
            amt: 2100
        },
        {
            name: dataTime && dataTime[7],
            uv: 3490,
            pv: storedForecast && storedForecast[7],
            amt: 2100
        },
    ];

    useEffect(() => {
        if (forecast) {
            const windSpeed = forecast.flat().map(item => item.wind && item.wind.speed);
            const speedSlice = windSpeed.slice(0, 8);
            setSpeed(speedSlice);
            const temperatures = forecast.flat().map(item => item.main && Math.floor(item.main.temp - 273));
            const tempSlice = temperatures.slice(0, 8);
            setStoredForecast(tempSlice);
            const date= forecast.flat().map(item => item && item.dt_txt)
            const dataSlice = date.slice(0, 8);
            const newDate = dataSlice.map((item) => item.slice(10, 16))
            setDataTime(newDate)
        }
    }, [forecast]);

    return (
        <div className={styles.chart}>
        <div className={styles.chart__cityies}>
            <p className={styles.chart__city}>{options.temp.name}</p>
        </div>
        <div className={styles.chart__widget}>
            <div><LineChart
                width={600}
                height={180}
                data={data}
                syncId="anyId"
                margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="pv" stroke="#82ca9d" fill="#82ca9d" />
                
            </LineChart></div>
            
        </div>
        </div>
    );
};

export default WidgetAllCard;