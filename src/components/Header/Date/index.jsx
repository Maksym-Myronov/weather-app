import { useSelector } from 'react-redux'
//Images
import heart from '../../../assets/img/Icon.svg'
//Styles
import styles from './index.module.scss'

const Data = () => {

    const options = useSelector((state) => state.temperature.temp)

    return (
        <div className={styles.data}>
            <div className={styles.data__link}>
                <a href="#">Favorites</a>
                <a href="#">Recent</a>
            </div>
            <div className={styles.data__local}>
                <p className={styles.data__city}>{options.name}, {options.sys && options.sys.country}</p>
                <img src={heart} alt="heart" className={styles.data__images}/>
            </div>
        </div>
    )
}

export default Data
