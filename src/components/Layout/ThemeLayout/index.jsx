import useTheme from '../../../hooks/useTheme'
//Styles
import styles from './index.module.scss'

const ThemeLayout = ({children}) => {

    const {isDark} = useTheme()

    return (
        <div className={isDark ? styles.layout : styles.layout__white}>
            {children}
        </div>
    )
}

export default ThemeLayout
