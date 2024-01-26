import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCityData, updateFavoriteStatus } from '../../../../reducers/cityCard/cardSlice';
import { useImage } from '../../../../core/hooks/UseImage';
//Images
import location from '../../../../assets/img/placeholder (1) 1.svg'
import starOne from '../../../../assets/img/star.png'
import starSecond from '../../../../assets/img/star (1).png'
import paginationOne from '../../../../assets/img/First.svg'
import paginationTwo from '../../../../assets/img/Prev.svg'
import paginationThree from '../../../../assets/img/Next.svg'
import paginationFour from '../../../../assets/img/Last.svg'
//Styles
import styles from '../index.module.scss';

const Favorites = () => {
    const options = useSelector((state) => state.card.temp);
    const { temp } = useSelector(selectCityData);
    const dispatch = useDispatch();
    const storedFavoriteStatus = JSON.parse(localStorage.getItem('favoriteStatus')) || {};
    const [favoriteStatus, setFavoriteStatus] = useState(storedFavoriteStatus);
    const [newMapArray, setNewMapArray] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
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
    const itemsPerPage = 4;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = options.slice(startIndex, endIndex);
    const totalPages = Math.ceil(options.filter(item => item.isFavorite).length / itemsPerPage);
    
    useEffect(() => {
        const newArray = () => {
            const mapArray = options.map((item) => {
                return item.isFavorite;
            });
            setNewMapArray(mapArray.filter((item) => item === true));
        };

        newArray();
    }, [options,]);
    
    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages])

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

    return (
        <div className={styles.allCard}>
            <div className={styles.allCards}>
                <h1 className={styles.allCards__recent}>Favorites</h1>
                <button className={styles.allCards__btn}>Clear All</button>
            </div>
            <div>
                {options.length > 0 ? (
                    <>
                        {currentItems.map((item) => (
                            item.isFavorite && (
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
                                    ) : null}
                                </div>
                            )
                        ))}
                        {options.every(item => !favoriteStatus[item.id] || !item.isFavorite) && (
                            <div className={styles.local__messages}>
                                <p>
                                    Unfortunately, you have no favorites items at the moment.
                                </p>
                            </div>
                        )}
                    </>
                ) : (
                    <div className={styles.local__messages}>
                        <p>
                            Unfortunately, you have no favorites items at the moment.
                        </p>
                    </div>
                )}
                {newMapArray && newMapArray.length >= 4 ?
                    <div className={styles.pagination}>
                        <div className={styles.pagination__container}>
                            <button className={styles.pagination__btn} onClick={handleFirstPage}><img src={paginationOne} alt="paginationFirst" /></button>
                            <button className={styles.pagination__btn} onClick={handlePreviousPage}><img src={paginationTwo} alt="paginationTwo" /></button>
                            <div className={styles.pagination__block}>
                                {[...Array(totalPages)].map((_, item) => (
                                    <button
                                        key={item}
                                        className={`${styles.pagination__number} ${currentPage === item + 1 ? styles.active : ''}`}
                                        onClick={() => setCurrentPage(item + 1)}
                                    >
                                        {item + 1}
                                    </button>
                                ))}
                            </div>
                            <button className={styles.pagination__btn} onClick={handleNextPage}><img src={paginationThree} alt="paginationThree" /></button>
                            <button className={styles.pagination__btn} onClick={handleLastPage}><img src={paginationFour} alt="paginationFour" /></button>
                        </div>
                    </div>
                : null}
            </div>
        </div>
    );
};

export default Favorites;