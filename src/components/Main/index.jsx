import Card from "./Card"
import LocalCard from "./LocalCard"

//Styles
import styles from './index.module.scss'

const Main = () => {
    return (
        <div className={styles.main}>
            <LocalCard />
            <Card />
        </div>
    )
}

export default Main
