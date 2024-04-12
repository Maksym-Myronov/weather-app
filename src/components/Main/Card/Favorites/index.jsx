import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateFavoriteStatus } from '../../../../store/cardSlice';
import { useImage } from '../../../../hooks/useImage';
import { useTranslation } from 'react-i18next';
import { useGetData } from '../../../../hooks/useGetData';
import { usePagination } from '../../../../hooks/usePagination';
import useTheme from '../../../../hooks/useTheme';
import translete from '../../../../translete/index'
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
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [renderWeatherImage] = useImage();
    const [currentDayEn, currentDayUa, currentDayOfMonth, currentMonthNameEn, currentMonthNameUa] = useGetData();
    const [handlePreviousPage, handleLastPage, handleNextPage, handleFirstPage, currentItems, temp, setCurrentPage, currentPage, totalPages, itemsPerPage, handlePreviousPageFavorites, handleFirstPageFavorites, handleNextPageFavorites, handleLastPageFavorites] = usePagination();
    const storedFavoriteStatus = JSON.parse(localStorage.getItem('favoriteStatus')) || {};
    const [newMapArray, setNewMapArray] = useState([]);
    const [favoriteStatus, setFavoriteStatus] = useState(storedFavoriteStatus);
    const { isDark } = useTheme();
    const totalPage = Math.ceil(options.filter(item => item.isFavorite).length / itemsPerPage);

    useEffect(() => {
        const newArray = options.filter(item => item.isFavorite);
        setNewMapArray([...newArray]);
    }, [options]);
    
    const handleStarClick = (id) => {
        const updatedStatus = { ...favoriteStatus, [id]: !favoriteStatus[id] };
        setFavoriteStatus(updatedStatus);
        localStorage.setItem('favoriteStatus', JSON.stringify(updatedStatus));

        const updatedTemp = temp.map(item => ({
            ...item,
            isFavorite: updatedStatus[item.id]
        }));

        dispatch(updateFavoriteStatus(updatedTemp));
    };

    return (
        <div className={styles.allCard}>
            <div className={isDark ? styles.allCards : styles.allCards__recent__black}>
                <h1 className={styles.allCards__recent}>{t("favorites")}</h1>
            </div>
            <div>
            {temp.length > 0 ? (
                <>
                    {currentItems.map((item) => (
                        favoriteStatus && favoriteStatus[item.id] ? (
                            <div className={isDark ? styles.local : styles.local__white} key={item.id}>
                                <div className={styles.local__container}>
                                    <button onClick={() => handleStarClick(item.id)} className={styles.local__button}>
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
                                        <p className={styles.local__text}>{translete.language === 'en' ? currentDayEn : currentDayUa}, {currentDayOfMonth} {translete.language === 'en' ? currentMonthNameEn : currentMonthNameUa}</p>
                                        <div className={styles.local__location}>
                                            <img src={location} alt="location" />
                                            <h1>
                                                {item && item.name && item.sys && item.sys.country
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
                            </div>
                        ) : null
                    ))}
                    {!currentItems.some(item => favoriteStatus && favoriteStatus[item.id]) && (
                        <div className={styles.local__messages}>
                            <p>{t("LoadingFavorites")}</p>
                        </div>
                    )}
                </>
                ) : (
                    <div className={styles.local__messages}>
                        <p>{t("LoadingFavorites")}</p>
                    </div>
                )}
                {options.filter(item => item.isFavorite).length >= 4 ?
                    <div className={styles.pagination}>
                        <div className={styles.pagination__container}>
                            <button className={styles.pagination__btn} onClick={handleFirstPageFavorites}><img src={paginationOne} alt="paginationFirst" /></button>
                            <button className={styles.pagination__btn} onClick={handlePreviousPageFavorites}><img src={paginationTwo} alt="paginationTwo" /></button>
                            <div className={styles.pagination__block}>
                                {[...Array(totalPage)].map((_, index) => (
                                    <button
                                        key={index + 1}
                                        className={`${styles.pagination__number} ${currentPage === index + 1 ? styles.active : ''}`}
                                        onClick={() => setCurrentPage(index + 1)}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>
                            <button className={styles.pagination__btn} onClick={() => handleNextPageFavorites(totalPage)}><img src={paginationThree} alt="paginationThree" /></button>
                            <button className={styles.pagination__btn} onClick={() => handleLastPageFavorites(totalPage)}><img src={paginationFour} alt="paginationFour" /></button>
                        </div>
                    </div>
                : null}
            </div>
        </div>
    );
};

export default Favorites;