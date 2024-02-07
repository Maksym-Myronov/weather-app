import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getTemperature } from '../../../reducers/ip/temperatureSlice'
import useTheme from '../../../hooks/useTheme'
//Images
import heart from '../../../assets/img/Icon.svg'
//Styles
import styles from './index.module.scss'

const Data = () => {
    const {t, i18n} = useTranslation()
    const dataWeather = useSelector((state) => state.cardWeather.temp)
    const [selectLanguage, setSelectLanguage] = useState("en");
    const {isDark, setIsDark} = useTheme()
    const dispatch = useDispatch()
    
    useEffect(() => {
        const getLanguage = localStorage.getItem("language")

        if(getLanguage) {
            i18n.changeLanguage(getLanguage)
            setSelectLanguage(getLanguage)
        } else {
            const defaultLanguage = "en"
            i18n.changeLanguage(defaultLanguage)
            localStorage.setItem("language", defaultLanguage)
            setSelectLanguage(defaultLanguage)
        }
    }, [i18n])

    const changeLanguages = (language) => {
        i18n.changeLanguage(language)
        localStorage.setItem("language", language)
        setSelectLanguage(language);
    }

    const handleChangeCity = () => {

        const latCity = dataWeather.coord && dataWeather.coord.lat;
        const lonCity = dataWeather.coord && dataWeather.coord.lon

        dispatch(getTemperature({ lat: latCity, lon:  lonCity}));
    }

    const handleCheckboxChange = () => {
        const newIsDark = !isDark;
        setIsDark(newIsDark);
        localStorage.setItem("themeButton", newIsDark);
    };

    return (
        <div className={isDark ? styles.data : styles.data__white}>
            <div className={styles.data__link}>
                <Link to="Favorites">{t("favorites")}</Link>
                <Link to="/">{t("recent")}</Link>
            </div>
            <div className={styles.data__local}>
                <p onClick={handleChangeCity} className={styles.data__city}>{dataWeather.name}, {dataWeather.sys && dataWeather.sys.country}</p>
                <img src={heart} alt="heart" className={styles.data__images}/>
            </div>
            <div>
                <select onChange={(e) => changeLanguages(e.target.value)} className={styles.data__select} value={selectLanguage}>
                    <option value="en" className={styles.data__options}>en</option>
                    <option value="ua" className={styles.data__options}>ua</option>
                </select>
            </div>
            <div>
                <input onChange={handleCheckboxChange} checked={isDark} type="checkbox" className={styles.data__checkbox} />
            </div>
        </div>
    )
}

export default Data
