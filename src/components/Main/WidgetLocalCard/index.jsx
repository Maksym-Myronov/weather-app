import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {selectTemperatureData} from '../../../reducers/ip/temperatureSlice'
import { useImage } from '../../../core/hooks/UseImage'
import WidgetAllCard from '../WidgetAllCard'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
//Styles
import styles from './index.module.scss'

const WidgetLocalCard = () => {

    const [forecast, setForecast] = useState(null)
    const [renderWeatherImage] = useImage()
    const options = useSelector(selectTemperatureData);

    useEffect(() => {
        const API_KEY = import.meta.env.VITE_WEATHER_APP_KEY;

        const getWeatherForWeek = async () => {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${options.lat}&lon=${options.lon}&appid=${API_KEY}`);
                const forecastRes = await response.json();
                const dailyForecasts = {};
                forecastRes.list.forEach(item => {
                    const date = item.dt_txt.split(' ')[0];
                    if (!dailyForecasts[date]) {
                        dailyForecasts[date] = [];
                    }
                    dailyForecasts[date].push(item);
                });
                const sevenDayForecast = Object.values(dailyForecasts).slice(0, 7);
                setForecast(sevenDayForecast);
            } catch (error) {
                console.error(error.message);
            }
        };
    
        getWeatherForWeek();
    
    }, [options.lat, options.lon, options]);

    const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Tur", "Fri", "Sat"]
    const dayInAWeek = new Date().getDay()
    const currentDay = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek))
    
    return (
        <div className={styles.widget}>
            <div>
                <WidgetAllCard forecast={forecast} />
            </div>
            <div className={styles.widget__local}>
                <div className={styles.widget__card}>
                    {Array.isArray(forecast) &&
                        forecast.map((dayForecast, index) => (
                            <div className={styles.widget__info} key={index}>
                                <p className={styles.widget__day}>{index === 0 ? "Today" : `${currentDay[index]}`}</p>
                                {renderWeatherImage(dayForecast[0].weather[0].main, { width: '36px', height: '36px' })}
                                <div className={styles.widget__temp}>
                                    <p className={styles.widget__max}>{index === 0 ? Math.floor(Number(dayForecast[0].main.temp_max) - 273.15) : Math.floor(Number(dayForecast[0].main.temp_max) - 273.15)}°</p>
                                    <p className={styles.widget__min}>{index === 0 ? Math.floor(Number(dayForecast.at(-1).main.temp_min) - 273.15) : Math.floor(Number(dayForecast.at(-1).main.temp_min) - 273.15)}°</p>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    ); 

}

export default WidgetLocalCard
