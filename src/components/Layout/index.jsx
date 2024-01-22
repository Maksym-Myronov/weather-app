import Header from '../Header'
import Main from '../Main'
import { Outlet } from 'react-router-dom'
//Styles
import styles from '../Main/index.module.scss'

const Layout = () => {
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.main}>
                <Main />
                <Outlet />
            </div>
        </div>
    )
}

export default Layout
