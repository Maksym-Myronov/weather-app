import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
//Images
import heart from '../../../assets/img/Icon.svg'
//Styles
import styles from './index.module.scss'

const Data = () => {
    const {t, i18n} = useTranslation()
    const options = useSelector((state) => state.temperature.temp)

    const changeLanguage = (language) => {
        i18n.changeLanguage(language)
    }
    return (
        <div className={styles.data}>
            <div className={styles.data__link}>
                <Link to="Favorites">{t("favorites")}</Link>
                <Link to="/">{t("recent")}</Link>
            </div>
            <div className={styles.data__local}>
                <p className={styles.data__city}>{options.name}, {options.sys && options.sys.country}</p>
                <img src={heart} alt="heart" className={styles.data__images}/>
            </div>
            <div>
                <button onClick={() => changeLanguage("en")}>en</button>
                <button onClick={() => changeLanguage("ua")}>ua</button>
            </div>
        </div>
    )
}

export default Data
