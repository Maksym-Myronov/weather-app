import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTemperature, selectTemperatureData } from '../../../feathers/ip/temperatureSlice';
//Images
import snow from '../../../assets/img/Image.svg'
import cloud from '../../../assets/img/06_cloudy_color.svg'
import sun from '../../../assets/img/01_sunny_color.svg'
import rain from '../../../assets/img/11_heavy_rain_color.svg'
import drizzle from '../../../assets/img/09_light_rain_color.svg'
import heavyRain from '../../../assets/img/14_thunderstorm_color (1).svg'
import partlyCloudy from '../../../assets/img/35_partly_cloudy_daytime_color.svg'
//Styles
import styles from './index.module.scss'

const LocalCard = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [currentTime, setCurrentTime] = useState('');
    const [lat, setLat] = useState(0)
    const [lon, setLon] = useState(0)
    const [celsiusMax, setCelsiusMax] = useState(0);
    const [celsiusMin, setCelsiusMin] = useState(0);
    const dispatch = useDispatch()
    const options = useSelector(selectTemperatureData);

    useEffect(() => {
        if (options.temp && options.temp.main) {
            const tempMaxCelsius = Math.floor(Number(options.temp.main.temp_max) - 273.15);
            const tempMinCelsius = Math.floor(Number(options.temp.main.temp_min) - 273.15);
            setCelsiusMax(tempMaxCelsius);
            setCelsiusMin(tempMinCelsius);
        }
    }, [options.temp]); 

    const onInputChange = useCallback(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://ip-api.com/json/');
                if (response.ok) {
                    const newData = await response.json();
                    setData(newData);
                    setLat(newData.lat);
                    setLon(newData.lon);
                    dispatch(getTemperature({ lat: newData.lat, lon: newData.lon }));
                } else if (response.status === 429) {
                    setError('Слишком много запросов. Пожалуйста, повторите попытку позже.');
                } else {
                    setError('Что-то пошло не так при получении геопозиции из API!');
                }
            } catch (error) {
                setError('Что-то пошло не так при получении геопозиции из API!');
            }
        };

        fetchData();
    }, [dispatch]);

    useEffect(() => {
        onInputChange();
    }, [onInputChange]);

    useEffect(() => {
        const updateCurrentTime = () => {
            const date = new Date();
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
            setCurrentTime(formattedTime);
        };

        const intervalId = setInterval(updateCurrentTime, 0);

        return () => clearInterval(intervalId);
    }, [currentTime]); 

    useEffect(() => {
        const getUserLocationFromAPI = async () => {
            const apiUrl = 'http://ip-api.com/json/';
            try {
                const response = await fetch(`${apiUrl}`);
                if (response.ok) {
                    const newData = await response.json();
                    setData(newData);
                } else if (response.status === 429) {
                    setError('Too many requests. Please try again later.');
                } else {
                    setError('Something went wrong getting Geolocation from API!');
                }
            } catch (error) {
                setError('Something went wrong getting Geolocation from API!');
            }
        };
        getUserLocationFromAPI();
    }, []);

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

        return <img src={imageSource} alt={weatherCondition} className={styles.local__card} />;
    };

    return (
        <div className={styles.local}>
            <div className={styles.local__container}>
                <h1>{data ? data.city : "Loading..."}</h1>
                <p className={styles.local__time}>{currentTime}</p>
            </div>
            <div className={styles.local__images}>
                {renderWeatherImage(options.temp && options.temp.weather && options.temp.weather[0]?.main)}
                <p>{options.temp && options.temp.weather && options.temp.weather[0]?.main}</p>
            </div>
            <div className={styles.local__temperature}>
                <p>AQI 70</p>
                <p> {celsiusMax} ° / {celsiusMin} °</p>
            </div>
        </div>
    )
}

export default LocalCard
