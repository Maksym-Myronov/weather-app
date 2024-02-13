import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCityData,  updateFavoriteStatus, updateSelectCity} from "../../../../reducers/cityCard/cardSlice";
import { useImage } from "../../../../hooks/useImage";
import { useGetData } from "../../../../hooks/useGetData";
import { useTranslation } from "react-i18next";
import ModalWindow from "../../../../shared/components/ModalWindow"
import translete from '../../../../translete/index'
//Images
import location from '../../../../assets/img/placeholder (1) 1.svg'
import starOne from '../../../../assets/img/star.png'
import starSecond from '../../../../assets/img/star (1).png'
//Styles
import styles from '../index.module.scss'
import useTheme from "../../../../hooks/useTheme";

const Recent = ({handleChangeState, currentItems, isActive, removeFromLocalStorage, removeAllLocalStorageData}) => {
    const storedFavoriteStatus = JSON.parse(localStorage.getItem('favoriteStatus')) || {};
    const storedSelectedCity = JSON.parse(localStorage.getItem('selectedCity')) || {}
    const [favoriteStatus, setFavoriteStatus] = useState(storedFavoriteStatus);
    const [selectCity, setSelectCity] = useState(storedSelectedCity)
    const dispatch = useDispatch();
    const { temp } = useSelector(selectCityData);
    const [renderWeatherImage] = useImage()
    const { t } = useTranslation()
    const { isDark } = useTheme()
    const [currentDayEn, currentDayUa, currentDayOfMonth, currentMonthNameEn, currentMonthNameUa] = useGetData()

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

    const handleCityChange = (id) => {
        const updatedStatus = {};
        
        temp.forEach(item => {
            updatedStatus[item.id] = item.id === id
        })

        setSelectCity(updatedStatus);
        localStorage.setItem('selectedCity', JSON.stringify(updatedStatus));

        const updatedTemp = temp.map(item => ({
            ...item,
            updateSelectCity: updatedStatus[item.id]
        }));

        dispatch(updateSelectCity(updatedTemp));
    }

    return (
        <div>
            <div className={isDark ? styles.allCards : styles.allCards__recent__black}>
                <h1 className={styles.allCards__recent }>{t("recent")}</h1>
                <button className={isDark ? styles.allCards__btn : styles.allCards__white} onClick={handleChangeState}>{t("clear")}</button>
                {isActive && 
                    <ModalWindow 
                        text={t("Question")}
                        warning={t("Warning")}
                        cancel={t("Cancel")}
                        delete={t("Delete")}
                        removeAllLocalStorageData={removeAllLocalStorageData}
                        handleChangeState={handleChangeState}
                    />}
            </div>
            {Array.isArray(currentItems) && currentItems.map((item) => (
                <div className={isDark ? styles.local : styles.local__white} key={item.id}>
                    <div className={styles.local__container}>
                        <button onClick={() => handleStarClick(item.id)} className={styles.local__button}><img src={ favoriteStatus[item.id] ?  starSecond : starOne} alt="star" className={styles.local__star} /></button>
                        <button onClick={() => removeFromLocalStorage(item.id)} className={styles.local__btn}>x</button>
                    </div>
                    <div className={styles.local__temperature} onClick={() => handleCityChange(item.id)}>
                        <div className={styles.local__day}>
                            <div>
                                <p className={styles.local__temp}>{Math.floor(item && item.main && item.main.temp) - 273}<span className={styles.local__span}>°</span></p>
                                <p className={styles.local__text}>{translete.language === 'en' ? currentDayEn : currentDayUa}, {currentDayOfMonth} {translete.language === 'en' ? currentMonthNameEn : currentMonthNameUa}</p>
                            </div>
                            <div className={styles.local__location}>
                                <img src={location} alt="location" />
                                <h1>{item && item.name && item.sys ? `${item.name}, ${item.sys.country}` : "Loading..."}</h1>
                            </div>
                        </div>
                        <div className={styles.local__images}>
                            {renderWeatherImage(item && item.weather && item.weather[0]?.main, {width: "80px", height: "80px"})}
                        </div>
                    </div>
                </div>
            ))}
        </div> 
    )
}

export default Recent
