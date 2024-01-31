import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCityData,  updateFavoriteStatus} from "../../../../reducers/cityCard/cardSlice";
import { useImage } from "../../../../core/hooks/UseImage";
import { useGetData } from "../../../../core/hooks/useGetData";
import ModalWindow from "../../../../shared/components/ModalWindow"
import translete from '../../../../translete/index'
//Images
import location from '../../../../assets/img/placeholder (1) 1.svg'
import starOne from '../../../../assets/img/star.png'
import starSecond from '../../../../assets/img/star (1).png'
//Styles
import styles from '../index.module.scss'
import { useTranslation } from "react-i18next";

const Recent = ({handleChangeState, currentItems, isActive, removeFromLocalStorage, removeAllLocalStorageData}) => {
    const { temp } = useSelector(selectCityData);
    const dispatch = useDispatch();
    const storedFavoriteStatus = JSON.parse(localStorage.getItem('favoriteStatus')) || {};
    const [favoriteStatus, setFavoriteStatus] = useState(storedFavoriteStatus);
    const [renderWeatherImage] = useImage()
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

    const {t} = useTranslation()

    return (
        <div>
            <div className={styles.allCards}>
                <h1 className={styles.allCards__recent}>{t("recent")}</h1>
                <button className={styles.allCards__btn} onClick={handleChangeState}>{t("clear")}</button>
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
                <div className={styles.local} key={item.id}>
                    <div className={styles.local__container}>
                        <button onClick={() => handleStarClick(item.id)} ><img src={ favoriteStatus[item.id] ?  starSecond : starOne} alt="star" className={styles.local__star} /></button>
                        <button onClick={() => removeFromLocalStorage(item.id)} className={styles.local__btn}>x</button>
                    </div>
                    <div className={styles.local__temperature}>
                        <div className={styles.local__day}>
                            <div>
                                <p className={styles.local__temp}>{Math.floor(item && item.main && item.main.temp) - 273}<span className={styles.local__span}>°</span></p>
                                <p>{translete.language === 'en' ? currentDayEn : currentDayUa}, {currentDayOfMonth} {translete.language === 'en' ? currentMonthNameEn : currentMonthNameUa}</p>
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
