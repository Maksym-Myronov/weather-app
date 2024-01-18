import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeCity, removeAllCity } from '../../../reducers/cityCard/cardSlice'
import ModalWindow from '../../../shared/components/ModalWindow'
//Images
import snow from '../../../assets/img/Image.svg'
import cloud from '../../../assets/img/06_cloudy_color.svg'
import sun from '../../../assets/img/01_sunny_color.svg'
import rain from '../../../assets/img/11_heavy_rain_color.svg'
import drizzle from '../../../assets/img/09_light_rain_color.svg'
import heavyRain from '../../../assets/img/14_thunderstorm_color (1).svg'
import partlyCloudy from '../../../assets/img/35_partly_cloudy_daytime_color.svg'
import location from '../../../assets/img/placeholder (1) 1.svg'
import paginationOne from '../../../assets/img/First.svg'
import paginationTwo from '../../../assets/img/Prev.svg'
import paginationThree from '../../../assets/img/Next.svg'
import paginationFour from '../../../assets/img/Last.svg'
//Styles
import styles from './index.module.scss'

const Card = () => {

    const [isActive, setIsActive] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const options = useSelector((state) => state.card.temp)
    const itemsPerPage = 4;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = options.slice(startIndex, endIndex);
    const totalPages = Math.ceil(options.length / itemsPerPage);

    const handleChangeState = () => {
        setIsActive(!isActive)
    }

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleFirstPage = () => {
        if (currentPage > 1) {
            setCurrentPage(Math.max(1, currentPage - 10));
        } 
    };
    
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleLastPage = () => {
        if (currentPage === 1) {
            setCurrentPage(Math.min(totalPages, currentPage + 9));
        } else if (currentPage < totalPages) {
            setCurrentPage(Math.min(totalPages, currentPage + 10));
        }
    };

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

    const removeAllLocalStorageData = () => {
        dispatch(removeAllCity(options.id))
        setIsActive(!isActive)
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
                    <button className={styles.allCards__btn} onClick={handleChangeState}>Cear All</button>
                    {isActive && <ModalWindow 
                        text="Are you sure you want to remove all cities from the recent list?"
                        warning="Warning"
                        cancel="Cancel"
                        delete="Delete"
                        removeAllLocalStorageData={removeAllLocalStorageData}
                        handleChangeState={handleChangeState}
                    />}
                </div>
                {Array.isArray(currentItems) && currentItems.slice(0, 4).map((item) => (
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
                                    <h1>{item && item.name && item.sys ? `${item.name}, ${item.sys.country}` : "Loading..."}</h1>
                                </div>
                            </div>
                            <div className={styles.local__images}>
                                {renderWeatherImage(item && item.weather && item.weather[0]?.main)}
                            </div>
                        </div>
                    </div>
                ))}
                {options.length >= 4 ?
                    <div className={styles.pagination}>
                        <div className={styles.pagination__container}>
                            <button className={styles.pagination__btn} onClick={handleFirstPage}><img src={paginationOne} alt="paginationFirst" /></button>
                            <button className={styles.pagination__btn} onClick={handlePreviousPage}><img src={paginationTwo} alt="paginationTwo" /></button>
                            <div className={styles.pagination__block}>
                                {[...Array(totalPages)].map((_, index) => (
                                    <button
                                        key={index}
                                        className={`${styles.pagination__number} ${currentPage === index + 1 ? styles.active : ''}`}
                                        onClick={() => setCurrentPage(index + 1)}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>
                            <button className={styles.pagination__btn} onClick={handleNextPage}><img src={paginationThree} alt="paginationThree" /></button>
                            <button className={styles.pagination__btn} onClick={handleLastPage}><img src={paginationFour} alt="paginationFour" /></button>
                        </div>
                    </div>
                : null}
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
