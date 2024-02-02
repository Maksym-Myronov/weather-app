import { Link } from 'react-router-dom'
//Images
import firstBar from '../../assets/img/Spiral 2.svg'
import person from '../../assets/img/3D_Illustrations_and_Characters-removebg-preview 1 (1).svg'
import secondBar  from '../../assets/img/Spiral 1.svg'
//Styles
import styles from './index.module.scss'

const ErrrorPage = () => {
    return (
        <div className={styles.error}>
            <div className={styles.error__imageOne}>
                <img src={firstBar} alt="forstBar"  />
            </div>
            <div className={styles.error__container}>
                <div>
                    <h1 className={styles.error__warning}>OOPS!!!</h1>
                    <h1 className={styles.error__status}>404 error</h1>
                    <p className={styles.error__text}>The page you are looking for <br /> can not found.</p>
                    <Link to="/"><button className={styles.error__btn}>Back Home</button></Link>
                </div>
                <div>
                    <img src={person} alt="person" />
                </div>
            </div>
            <div>
                <img src={secondBar} alt="secondBar" />
            </div>
        </div>
    )
}

export default ErrrorPage
