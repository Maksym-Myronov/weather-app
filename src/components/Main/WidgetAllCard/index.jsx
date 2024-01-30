import  { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// Styles
import styles from './index.module.scss';
import { useTranslation } from 'react-i18next';

const WidgetAllCard = ({ forecast }) => {
    const [storedForecast, setStoredForecast] = useState(null);
    const [dataTime, setDataTime] = useState(null);

    const data = new Date();
    const currentYear = data.getFullYear();
    const currentData = data.getDate();
    const currentMonth = data.getMonth();
    const allDate = `${currentData < 10 ? '0' + currentData : currentData}.${currentMonth < 10 ? '0' + (currentMonth + 1) : currentMonth + 1}.${currentYear} `;

    useEffect(() => {
        if (forecast) {
        const temperatures = forecast.flat().map(item => item.main && Math.floor(item.main.temp - 273));
        const tempSlice = temperatures.slice(0, 8);
        setStoredForecast(tempSlice);
        const date = forecast.flat().map(item => item && item.dt_txt);
        const dataSlice = date.slice(0, 8);
        const newDate = dataSlice.map(item => item.slice(10, 16));
        setDataTime(newDate);
        }
    }, [forecast]);

    const minTemperature = storedForecast && Math.min(...storedForecast) - 1;
    const maxTemperature = storedForecast && Math.max(...storedForecast) ;

    const chartData = [
        { name: dataTime && dataTime[0], uv: storedForecast && storedForecast[0], pv: 4000, amt: 2400 },
        { name: dataTime && dataTime[1], uv: storedForecast && storedForecast[1], pv: 3000, amt: 2210 },
        { name: dataTime && dataTime[2], uv: storedForecast && storedForecast[2], pv: 2000, amt: 2290 },
        { name: dataTime && dataTime[3], uv: storedForecast && storedForecast[3], pv: 2780, amt: 2000 },
        { name: dataTime && dataTime[4], uv: storedForecast && storedForecast[4], pv: 1890, amt: 2181 },
        { name: dataTime && dataTime[5], uv: storedForecast && storedForecast[5], pv: 2390, amt: 2500 },
        { name: dataTime && dataTime[6], uv: storedForecast && storedForecast[6], pv: 3490, amt: 2100 },
        { name: dataTime && dataTime[7], uv: storedForecast && storedForecast[7], pv: 3490, amt: 2100 },
        { name: dataTime && dataTime[8], uv: maxTemperature, pv: 0, amt: 0 },
    ];

    const { t } = useTranslation();

    return (
        <div className={styles.chart}>
            <div className={styles.chart__widget}>
                <div className={styles.chart__day}>
                    <h1 className={styles.chart__average}>{t("Temperature")}</h1>
                    <h1>{allDate}</h1>
                </div>
                <ResponsiveContainer width="100%" height={250}>
                    <AreaChart
                        data={chartData}
                        margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis domain={[minTemperature, maxTemperature]} />
                        <Tooltip />
                        <Area
                                type="monotone"
                                dataKey="uv"
                                fill="rgba(76, 223, 232, 0.3), rgba(121, 71, 247, 0.3)"
                                stroke="transparent"
                                isAnimationActive={true}
                            />
                        <Area
                            type="monotone"
                            dataKey="uv"
                            stroke="rgba(76, 223, 232, 1), rgba(121, 71, 247, 1)"
                            strokeWidth={2}
                            fill="transparent"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default WidgetAllCard;