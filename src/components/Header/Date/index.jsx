import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
//Images
import heart from '../../../assets/img/Icon.svg'
//Styles
import styles from './index.module.scss'

const Data = () => {

    const options = useSelector((state) => state.temperature.temp)

    return (
        <div className={styles.data}>
            <div className={styles.data__link}>
                <Link to="Favorites">Favorites</Link>
                <Link to="/">Recent</Link>
            </div>
            <div className={styles.data__local}>
                <p className={styles.data__city}>{options.name}, {options.sys && options.sys.country}</p>
                <img src={heart} alt="heart" className={styles.data__images}/>
            </div>
        </div>
    )
}

export default Data
