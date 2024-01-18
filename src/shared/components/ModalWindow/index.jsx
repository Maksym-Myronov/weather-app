//Styles
import styles from './index.module.scss'

const ModalWindow = (props, {removeAllLocalStorageData, handleChangeState}) => {

    return (
        <div className={styles.window}>
            <div className={styles.window__container}>
                <div className={styles.window__text}>
                    <p className={styles.window__warning}>{props.warning}</p>
                    <h1>{props.text}</h1>
                    <button className={styles.window__btnFirst} onClick={props.handleChangeState}>{props.cancel}</button>
                    <button className={styles.window__btnSecond} onClick={props.removeAllLocalStorageData}>{props.delete}</button>
                </div>
            </div>
        </div>
    )
}

export default ModalWindow
