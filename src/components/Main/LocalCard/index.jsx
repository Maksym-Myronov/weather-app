import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTemperature, selectTemperatureData } from '../../../feathers/ip/temperatureSlice';
//Images
import snow from '../../../assets/img/Image.svg'
//Styles
import styles from './index.module.scss'

const LocalCard = () => {
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    const [currentTime, setCurrentTime] = useState('');
    const [lat, setLat] = useState(0)
    const [lon, setLon] = useState(0)
    const dispatch = useDispatch()
    const options = useSelector(selectTemperatureData);

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

    const apiUrl = 'http://ip-api.com/json/';

    useEffect(() => {
        const getUserLocationFromAPI = async () => {
            try {
                const response = await fetch(`${apiUrl}`);
                if (response.ok) {
                    const newData = await response.json();
                    setData(newData);
                    console.log(newData);
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
    }, [lat, lon]);

    return (
        <div className={styles.local}>
            <div className={styles.local__container}>
                <h1>{data.city}</h1>
                <p className={styles.local__time}>{currentTime}</p>
            </div>
            <div className={styles.local__images}>
                <img src={snow} alt="snow" />
                <p>{options.temp && options.temp.weather && options.temp.weather[0]?.main}</p>
            </div>
            <div className={styles.local__temperature}>
                <p>AQI 70</p>
                <p>{options.temp.main?.feels_like}° {options.temp.main?.temp_min}°</p>
            </div>
        </div>
    )
}

export default LocalCard
