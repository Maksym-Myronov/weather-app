import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {selectTemperatureData} from '../../../reducers/ip/temperatureSlice'
//Images
import sun from '../../../assets/img/01_sunny_color.svg'
import snow from '../../../assets/img/Image.svg'
import cloud from '../../../assets/img/06_cloudy_color.svg'
import rain from '../../../assets/img/11_heavy_rain_color.svg'
import drizzle from '../../../assets/img/09_light_rain_color.svg'
import heavyRain from '../../../assets/img/14_thunderstorm_color (1).svg'
import partlyCloudy from '../../../assets/img/35_partly_cloudy_daytime_color.svg'
//Styles
import styles from './index.module.scss'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import WidgetAllCard from '../WidgetAllCard'

const WidgetLocalCard = () => {

    const [forecast, setForecast] = useState(null)
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

    const renderWeatherImage = (weatherCondition) => {
        let imageSource;
        switch (weatherCondition) {
            case 'Thunderstorm':
                imageSource = heavyRain;
                break;
            case 'Drizzle':
                imageSource = drizzle;
                break;
            case 'Rain':
                imageSource = rain;
                break;
            case 'Snow':
                imageSource = snow;
                break;
            case 'Clear':
                imageSource = sun;
                break;
            case 'Clouds':
                imageSource = cloud;
                break;
            default:
                imageSource = partlyCloudy; 
                break;
        }

        return <img src={imageSource} alt={weatherCondition} className={styles.widget__images} style={{ width: '36px', height: '36px' }} />;
    };
    
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
                                {renderWeatherImage(dayForecast[0].weather[0].main)}
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
