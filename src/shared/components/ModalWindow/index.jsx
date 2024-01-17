/* eslint-disable react/prop-types */
import styles from './index.module.scss'

const ModalWindow = (props) => {
    return (
        <div className={styles.window}>
            <div className={styles.window__container}>
                <div className={styles.window__text}>
                    <h1>{props.text}</h1>
                    <p>{props.warning}</p>
                    <button className={styles.window__btnFirst}>{props.cancel}</button>
                    <button className={styles.window__btnSecond}>{props.delete}</button>
                </div>
            </div>
        </div>
    )
}

export default ModalWindow
