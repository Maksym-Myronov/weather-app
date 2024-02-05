import { useState, useEffect, useRef  } from 'react';
import { useTranslation } from 'react-i18next';
import useTheme from '../../../hooks/useTheme';
import Chart from 'chart.js/auto';
// Styles
import styles from './index.module.scss';

const WidgetAllCard = ({ forecast }) => {
    const [storedForecast, setStoredForecast] = useState(null);
    const [dataTime, setDataTime] = useState(null);
    const { t } = useTranslation();
    const {isDark} = useTheme()
    const data = new Date();
    const currentYear = data.getFullYear();
    const currentData = data.getDate();
    const currentMonth = data.getMonth();
    const allDate = `${currentData < 10 ? '0' + currentData : currentData}.${currentMonth < 10 ? '0' + (currentMonth + 1) : currentMonth + 1}.${currentYear} `;
    const chartRef = useRef(null);

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

    useEffect(() => {
        if (storedForecast && dataTime) {
            const ctx = chartRef.current.getContext('2d');
            const gradient = ctx.createLinearGradient(0, 0, 0, 200);
            gradient.addColorStop(0, 'rgba(121, 71, 247, 0.15)');
            gradient.addColorStop(1, 'rgba(76, 223, 232, 0.15)');
            const borderColorGradient = ctx.createLinearGradient(0, 0, 0, 200);
            borderColorGradient.addColorStop(0.85, 'rgba(121, 71, 247, 1)');
            borderColorGradient.addColorStop(1, 'rgba(76, 223, 232, 1)');
    
            const chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: dataTime,
                    datasets: [
                        {
                            label: '# of votes',
                            data: storedForecast,
                            backgroundColor: gradient,
                            borderColor: borderColorGradient,
                            borderWidth: 1,
                            fill: 'start',
                            pointRadius: 1,
                        },
                    ],
                },
                options: {
                    scales: {
                        x: {
                            grid: {
                                display: false,
                            },
                        },
                        y: {
                            ticks: {
                                beginAtZero: false,
                                callback: value => Math.floor(value),
                                stepSize: 1,
                            },
                        },
                    },
                    plugins: {
                        legend: {
                            display: false,
                        },
                        tooltip: {
                            intersect: false,
                            mode: 'index',
                            callbacks: {
                                label: function (context) {
                                    return Math.floor(context.parsed.y);
                                },
                            },
                        },
                        crosshair: {
                            mode: 'y',
                        },
                    },
                },
            });
    
            return () => chart.destroy();
        }
    }, [storedForecast, dataTime]);


    return (
        <div className={styles.chart}>
            <div className={isDark ? styles.chart__widget : styles.chart__white}>
                <div className={styles.chart__day}>
                    <h1 className={styles.chart__average}>{t("Temprature")}</h1>
                    <h1>{allDate}</h1>
                </div>
                <div className={styles.chart__line}>
                    <canvas ref={chartRef} height={200} width={650}></canvas> 
                </div>
            </div>
        </div>
    );
};

export default WidgetAllCard;