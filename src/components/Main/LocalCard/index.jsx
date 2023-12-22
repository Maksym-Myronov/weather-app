import { useState, useEffect } from 'react';
//Images
import snow from '../../../assets/img/Image.svg'
//Styles
import styles from './index.module.scss'

const LocalCard = () => {
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    const [currentTime, setCurrentTime] = useState('');

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
    }, []);

    return (
        <div className={styles.local}>
            <div className={styles.local__container}>
                <h1>{data.city}</h1>
                <p className={styles.local__time}>{currentTime}</p>
            </div>
            <div className={styles.local__images}>
                <img src={snow} alt="snow" />
                <p>Snow</p>
            </div>
            <div className={styles.local__temperature}>
                <p>AQI 70</p>
                <p>-5° -0°</p>
            </div>
        </div>
    )
}

export default LocalCard
