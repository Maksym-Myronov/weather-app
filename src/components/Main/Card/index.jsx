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
import location from '../../../assets/img/placeholder (1) 1.svg'
//Styles
import styles from './index.module.scss'

const Card = () => {

    const options = useSelector((state) => state.card.temp)

    const dispatch = useDispatch()

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

        return <img src={imageSource} alt={weatherCondition} className={styles.local__card}  style={{ width: '80px', height: '80px' }} />;
        
    };

    const removeFromLocalStorage = (idRemove) => {
        dispatch(removeCity(idRemove))
    }

    const monthInAYear = new Date().getMonth();
    const MONTH_YEAR = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const WEEK_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayInAWeek = new Date().getDay();
    const currentDay = WEEK_DAYS[dayInAWeek];
    const currentDayOfMonth = new Date().getDate();
    const currentMonthName = MONTH_YEAR[monthInAYear];

    return (
        (options.length ? 
            <div className={styles.allCard}>
                <div className={styles.allCards}>
                    <h1 className={styles.allCards__recent}>Recent</h1>
                    <button className={styles.allCards__btn}>Cear All</button>
                </div>
                {Array.isArray(options) && options.slice(0, 4).map((item) => (
                    <div className={styles.local} key={item.id}>
                        <div className={styles.local__container}>
                            <p className={styles.local__temp}>{Math.floor(item && item.main && item.main.temp) - 273}<span className={styles.local__span}>°</span></p>
                            <button onClick={() => removeFromLocalStorage(item.id)} className={styles.local__btn}>x</button>
                        </div>
                        <div className={styles.local__temperature}>
                            <div className={styles.local__day}>
                                <p>{currentDay}, {currentDayOfMonth} {currentMonthName}</p>
                                <div className={styles.local__location}>
                                    <img src={location} alt="location" />
                                    <h1>{item && item.name ? item.name : "Loading..."}</h1>
                                </div>
                            </div>
                            <div className={styles.local__images}>
                                {renderWeatherImage(item && item.weather && item.weather[0]?.main)}
                            </div>
                        </div>
                    </div>
                ))}
            </div> 
        : 
            <div className={styles.allCard}>
                <div className={styles.allCards}>
                    <h1 className={styles.allCards__recent}>Recent</h1>
                </div>
                    <div className={styles.local__error}>
                        <p>Unfortunately, you have no recent items at the moment. Try adding new cities to see fresh weather data here.</p>
                    </div>
            </div> 
        )
    );
}

export default Card
