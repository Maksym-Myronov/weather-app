import WidgetLocalCard from '../Main/WidgetLocalCard'
import Card from "./Card"
import LocalCard from "./LocalCard"

//Styles
import styles from './index.module.scss'

const Main = () => {
    return (
        <div className={styles.main}>
            <div className={styles.main__cardsContainer}>
                <LocalCard />
                <WidgetLocalCard  />
            </div>
            <Card />
        </div>
    )
}

export default Main
