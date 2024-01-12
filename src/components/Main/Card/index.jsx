import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeCity } from '../../../feathers/cityCard/cardSlice'
//Images
import snow from '../../../assets/img/Image.svg'
import cloud from '../../../assets/img/06_cloudy_color.svg'
import sun from '../../../assets/img/01_sunny_color.svg'
import rain from '../../../assets/img/11_heavy_rain_color.svg'
import drizzle from '../../../assets/img/09_light_rain_color.svg'
import heavyRain from '../../../assets/img/14_thunderstorm_color (1).svg'
import partlyCloudy from '../../../assets/img/35_partly_cloudy_daytime_color.svg'
import trash from '../../../assets/img/icons8-cross-mark-25.png'
//Styles
import styles from './index.module.scss'

const Card = () => {

    const options = useSelector((state) => state.card.temp)
    const [currentTime, setCurrentTime] = useState('');
    const dispatch = useDispatch()

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
    }, [options]);

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

    const removeFromLocalStorage = (idRemove) => {
        dispatch(removeCity(idRemove))
    }

    return (
        <div className={styles.allCard}>
            {Array.isArray(options) && options.slice(0, 4).map((item) => (
                <div className={styles.local} key={item.id}>
                    <div className={styles.local__container}>
                        <h1>{item && item.name ? item.name : "Loading..."}</h1>
                        <button onClick={() => removeFromLocalStorage(item.id)} className={styles.local__btn}><img src={trash} alt="trash" /></button>
                    </div>
                    <div className={styles.local__images}>
                        {renderWeatherImage(item && item.weather && item.weather[0]?.main)}
                        <p>{item && item.weather && item.weather[0]?.main}</p>
                    </div>
                    <div className={styles.local__temperature}>
                        <p>AQI 70</p>
                        <p>{Math.floor(item && item.main && item.main.temp) - 273} ℃</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Card
