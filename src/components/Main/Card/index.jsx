//Images
import plus from '../../../assets/img/Plus.svg'
//Styles
import styles from './index.module.scss'

const Card = () => {
    return (
        <div className={styles.card}>
            <div className={styles.card__container}>
                <button className={styles.card__btn}><img src={plus} alt="plus" /></button>
            </div>
        </div>
    )
}

export default Card
