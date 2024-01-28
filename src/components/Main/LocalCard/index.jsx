import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useImage } from '../../../core/hooks/UseImage';
import { getTemperature, selectTemperatureData } from '../../../reducers/ip/temperatureSlice';
//Styles
import styles from './index.module.scss'
import { useTranslation } from 'react-i18next';

const LocalCard = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [currentTime, setCurrentTime] = useState('');
    const [lat, setLat] = useState(0)
    const [lon, setLon] = useState(0)
    const [renderWeatherImage] = useImage()
    const [celsiusMax, setCelsiusMax] = useState(0);
    const dispatch = useDispatch()
    const options = useSelector(selectTemperatureData);

    useEffect(() => {
        if (options.temp && options.temp.main) {
            const tempMaxCelsius = Math.floor(Number(options.temp.main.temp_max) - 273.15);
            setCelsiusMax(tempMaxCelsius);
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
                    setError('Too many requests. Please try again later.');
                } else {
                    setError('Something went wrong while retrieving the geolocation from the API!');
                }
            } catch (error) {
                setError('Something went wrong while retrieving the geolocation from the API!');
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

    const {t} = useTranslation()

    return (
        <div className={styles.local}>
            <div className={styles.local__container}>
                <h1>{data ? data.city : "Loading..."}</h1>
                <p className={styles.local__time}>{currentTime}</p>
            </div>
            <div className={styles.local__images}>
                {renderWeatherImage(options.temp && options.temp.weather && options.temp.weather[0]?.main, {width: "100px", height: "100px"})}
                <p>{t(options.temp && options.temp.weather && options.temp.weather[0]?.main)}</p>
            </div>
            <div className={styles.local__temperature}>
                <p>AQI 70</p>
                <p> {celsiusMax} ℃</p>
            </div>
        </div>
    )
}

export default LocalCard
