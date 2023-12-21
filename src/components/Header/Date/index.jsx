//Styles
import styles from './index.module.scss'

const Data = () => {
    const data = new Date();
    const currentYear = data.getFullYear();
    const currentData = data.getDate()
    const currentMonth = data.getMonth()
    const allDate = `${currentData < 10 ? '0' + currentData : currentData}.${currentMonth + 1}.${currentYear} `

    return (
        <div className={styles.data}>
            <div className={styles.data__container}>
                <h1>{allDate}</h1>
            </div>
        </div>
    )
}

export default Data
