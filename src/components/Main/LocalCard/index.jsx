import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useImage } from '../../../core/hooks/UseImage';
import { getTemperature, selectTemperatureData } from '../../../reducers/ip/temperatureSlice';
import { useTranslation } from 'react-i18next';
import { useGetData } from '../../../core/hooks/useGetData';
import translete from '../../../translete/index'
//Images
import sunRise from '../../../assets/img/sunrise.png'
import sunSet from '../../../assets/img/sunset.png'
import humidity from '../../../assets/img/humidity.png'
import wind from '../../../assets/img/wind.png'
import pressure from '../../../assets/img/pressure.png'
import seaLevel from '../../../assets/img/sea-level.png'
//Styles
import styles from './index.module.scss'

const LocalCard = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [currentTime, setCurrentTime] = useState('');
    const [celsiusFeelsLike, setCelsiusFeelsLike] = useState(0)
    const [celsiusMax, setCelsiusMax] = useState(0);
    const [formattedTime, setFormattedTime] = useState('');
    const [sunset, setSunset] = useState('');
    const [lat, setLat] = useState(0)
    const [lon, setLon] = useState(0)
    const [renderWeatherImage] = useImage()
    const dispatch = useDispatch()
    const options = useSelector(selectTemperatureData);
    const [currentDayEn, currentDayUa, currentDayOfMonth, currentMonthNameEn, currentMonthNameUa] = useGetData()

    useEffect(() => {
        if (options.temp && options.temp.main) {
            const tempMaxCelsius = Math.floor(Number(options.temp.main.temp_max) - 273.15);
            setCelsiusMax(tempMaxCelsius);
        }
        if (options.temp && options.temp.main) {
            const tempMaxCelsius = Math.floor(Number(options.temp.main.feels_like) - 273.15);
            setCelsiusFeelsLike(tempMaxCelsius);
        }
        if(options.temp && options.temp.sys) {
            const newValue = options.temp && options.temp.sys && options.temp.sys.sunrise;
            const dateObject = new Date(newValue * 1000);
            const formattedTime = dateObject.toLocaleTimeString().slice(0, 5);
            setFormattedTime(formattedTime);
        }
        if(options.temp && options.temp.sys) {
            const newValue = options.temp && options.temp.sys && options.temp.sys.sunset;
            const dateObject = new Date(newValue * 1000);
            const formattedTime = dateObject.toLocaleTimeString().slice(0, 5);
            setSunset(formattedTime);
        }
    }, [options.temp, options.sys]); 

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
    const windSpeed = Math.ceil(options.temp && options.temp.wind && options.temp.wind.speed * 3.60).toString()

    return (
        <div className={styles.local}>
            <div className={styles.local__main}>
                <div >
                    <div>
                        <p className={styles.local__celsiusMax}>{celsiusMax}&#8451;</p>
                        <p className={styles.local__feels}>{t("Feels like")}: <span className={styles.local__feelsLike}>{celsiusFeelsLike}&#8451;</span></p>
                    </div>
                    <div className={styles.local__sunriseCard}>
                        <div>
                            <img src={sunRise} alt="sunRise" className={styles.local__sunrise} />
                        </div>
                        <div>
                            <p>{t("Sunrise")}</p>
                            <p>{formattedTime} am</p>
                        </div>
                    </div>
                    <div className={styles.local__suset}>
                        <div>
                            <img src={sunSet} alt="sunset" className={styles.local__imageSunset} />
                        </div>
                        <div className={styles.local__sunsetText}>
                            <p>{t("Sunset")}</p>
                            <p>{sunset} pm</p>
                        </div>
                    </div>
                </div>
                <div className={styles.local__images}>
                    {renderWeatherImage(options.temp && options.temp.weather && options.temp.weather[0]?.main, {width: "200px", height: "200px"})}
                    <p>{t(options.temp && options.temp.weather && options.temp.weather[0]?.main)}</p>
                </div>
                <div>
                    <div className={styles.local__information}>
                        <div className={styles.local__container}>
                            <div>
                                <img src={humidity} alt="humidiatly" className={styles.local__imageshumidiatly} />
                            </div>
                            <div>
                                <p>{options.temp && options.temp.main && options.temp.main.humidity}%</p>
                                <p>{t("Humidity")}</p>
                            </div>
                        </div>
                        <div className={styles.local__container}>
                            <div>
                                <img src={wind} alt="wind" className={styles.local__imageWind} />
                            </div>
                            <div>
                                <p>{windSpeed}</p>
                                <p>{t("Wind Speed")}</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.local__information}>
                        <div className={styles.local__container}>
                            <div>
                                <img src={pressure} alt="pressure" className={styles.local__imagePressure} />
                            </div>
                            <div>
                                <p>{options.temp && options.temp.main && options.temp.main.pressure}mbar</p>
                                <p>{t("Pressure")}</p>
                            </div>
                        </div>
                        <div  className={styles.local__container}>
                            <div> 
                                <img src={seaLevel} alt="seaLevel" className={styles.local__imageSea} />
                            </div>
                            <div>
                                <p>{options.temp && options.temp.main && options.temp.main.sea_level}</p>
                                <p>{t("Sea level")}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.local__info}>
                <div>
                    <h1 className={styles.local__data}>{data ? data.city : "Loading..."}</h1>
                    <p className={styles.local__time}>{currentTime}</p>
                    <p>{translete.language === 'en' ? currentDayEn : currentDayUa}, {currentDayOfMonth} {translete.language === 'en' ? currentMonthNameEn : currentMonthNameUa}</p>
                </div>
            </div>
        </div>
    )
}

export default LocalCard
