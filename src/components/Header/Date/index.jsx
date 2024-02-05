import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import useTheme from '../../../hooks/useTheme'
//Images
import heart from '../../../assets/img/Icon.svg'
//Styles
import styles from './index.module.scss'

const Data = () => {
    const {t, i18n} = useTranslation()
    const options = useSelector((state) => state.temperature.temp)
    const [selectLanguage, setSelectLanguage] = useState("en");
    const {isDark, setIsDark} = useTheme()

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
    
    return (
        <div className={isDark ? styles.data : styles.data__white}>
            <div className={styles.data__link}>
                <Link to="Favorites">{t("favorites")}</Link>
                <Link to="/">{t("recent")}</Link>
            </div>
            <div className={styles.data__local}>
                <p className={styles.data__city}>{options.name}, {options.sys && options.sys.country}</p>
                <img src={heart} alt="heart" className={styles.data__images}/>
            </div>
            <div>
                <select onChange={(e) => changeLanguages(e.target.value)} className={styles.data__select} value={selectLanguage}>
                    <option value="en" className={styles.data__options}>en</option>
                    <option value="ua" className={styles.data__options}>ua</option>
                </select>
            </div>
            <div>
                <input onClick={() => setIsDark(!isDark)} type="checkbox" className={styles.data__checkbox} />
            </div>
        </div>
    )
}

export default Data
