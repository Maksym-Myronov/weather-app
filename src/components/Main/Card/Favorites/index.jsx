import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCityData, updateFavoriteStatus } from '../../../../reducers/cityCard/cardSlice';
import { useImage } from '../../../../core/hooks/UseImage';
//Images
import location from '../../../../assets/img/placeholder (1) 1.svg'
import starOne from '../../../../assets/img/star.png'
import starSecond from '../../../../assets/img/star (1).png'
//Styles
import styles from '../index.module.scss';

const Favorites = () => {
    const options = useSelector((state) => state.card.temp);
    const { temp } = useSelector(selectCityData);
    const dispatch = useDispatch();
    const storedFavoriteStatus = JSON.parse(localStorage.getItem('favoriteStatus')) || {};
    const [favoriteStatus, setFavoriteStatus] = useState(storedFavoriteStatus);
    const [renderWeatherImage] = useImage()

    const handleStarClick = (id) => {
        const updatedStatus = { ...favoriteStatus, [id]: !favoriteStatus[id] };
        setFavoriteStatus(updatedStatus);
        localStorage.setItem('favoriteStatus', JSON.stringify(updatedStatus));

        const updatedTemp = temp.map(item => ({
            ...item,
            isFavorite: updatedStatus[item.id]
        }));

        dispatch(updateFavoriteStatus(updatedTemp));
    }

    const monthInAYear = new Date().getMonth();
    const MONTH_YEAR = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const WEEK_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayInAWeek = new Date().getDay();
    const currentDay = WEEK_DAYS[dayInAWeek];
    const currentDayOfMonth = new Date().getDate();
    const currentMonthName = MONTH_YEAR[monthInAYear];

return (
    <div className={styles.allCard}>
        <div className={styles.allCards}>
            <h1 className={styles.allCards__recent}>Favorites</h1>
            <button className={styles.allCards__btn}>Clear All</button>
        </div>
        <div>
            <ul>
                {options.length > 0 ? (
                    options.map((item) => (
                        <div className={styles.local} key={item.id}>
                            {favoriteStatus[item.id] ? (
                                <>
                                    <div className={styles.local__container}>
                                        <button onClick={() => handleStarClick(item.id)}>
                                            <img
                                                src={favoriteStatus[item.id] ? starSecond : starOne}
                                                alt="star"
                                                className={styles.local__star}
                                            />
                                        </button>
                                    </div>
                                    <div className={styles.local__temperature}>
                                        <div className={styles.local__day}>
                                            <p className={styles.local__temp}>{Math.floor(item && item.main && item.main.temp) - 273}<span className={styles.local__span}>°</span></p>
                                            <p>{currentDay}, {currentDayOfMonth} {currentMonthName}</p>
                                            <div className={styles.local__location}>
                                                <img src={location} alt="location" />
                                                <h1>
                                                    {item && item.name && item.sys
                                                        ? `${item.name}, ${item.sys.country}`
                                                        : "Loading..."}
                                                </h1>
                                            </div>
                                        </div>
                                        <div className={styles.local__images}>
                                            {renderWeatherImage(
                                                item && item.weather && item.weather[0]?.main,
                                                { width: "80px", height: "80px" }
                                            )}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className={styles.local__messages}>
                                    <p>
                                    Unfortunately, you have no favorites items at the moment.
                                    </p>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className={styles.local__messages}>
                        <p>
                            Unfortunately, you have no favorites items at the moment.
                        </p>
                    </div>
                )}
            </ul>
        </div>
    </div>
);
};

export default Favorites;