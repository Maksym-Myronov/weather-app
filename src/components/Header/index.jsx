import useTheme from '../../hooks/useTheme';
import Data from './Date';
import Input from './Input';
//Styles
import styles from './index.module.scss';

const Header = () => {

    const {isDark} = useTheme()

    return (
        <div className={isDark ? styles.header : styles.header__white}>
            <Input />
            <Data />
        </div>
    )
}

export default Header
