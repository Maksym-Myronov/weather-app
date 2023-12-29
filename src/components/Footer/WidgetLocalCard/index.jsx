import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {selectTemperatureData} from '../../../feathers/ip/temperatureSlice'
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

    const MONTH_YEAR = ["February", "Marc", "April", "May", "June", "July", "August", "September", "October", "November", "December", "January" ]
    const WEEK_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const monthInAYear = new Date().getMonth()
    const dayInAWeek = new Date().getDay()
    const currentDayOfMonth = new Date().getDate();
    const currentMonth = MONTH_YEAR.slice(monthInAYear, MONTH_YEAR.length).concat(MONTH_YEAR.slice(0, monthInAYear))
    const currentDay = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek))
    const currentMonthName = currentMonth[new Date().getMonth()];
    const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
    const daysOfMonth = Array.from({ length: daysInMonth }, (_, i) => (currentDayOfMonth + i) % daysInMonth || daysInMonth);

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

        return <img src={imageSource} alt={weatherCondition} />;
    };
    
    return (
        <div className={styles.widget}>
            <div className={styles.widget__local}>
                <div className={styles.widget__citys}>
                    <p className={styles.widget__city}>{options.temp.name}</p>
                </div>
                <div className={styles.widget__card}>
                    {Array.isArray(forecast) && forecast.map((dayForecast, index) => (
                        <div className={styles.widget__info} key={index}>
                            <p>{index === 0 ? `Today (${currentDay[index]})` : `${currentDay[index]}`}</p>
                            <p>{currentMonthName} {daysOfMonth[index]}</p>
                            {renderWeatherImage(dayForecast[0].weather[0].main)}
                            <p>{dayForecast[0].weather[0].main}</p>
                            <p>{index === 0 ? Math.floor(Number(dayForecast[0].main.temp_max) - 273.15) : Math.floor(Number(dayForecast[4].main.temp_max) - 273.15)}℃</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default WidgetLocalCard
