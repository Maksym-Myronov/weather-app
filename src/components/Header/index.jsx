import Data from './Date';
import Input from './Input';
//Styles
import styles from './index.module.scss';

const Header = () => {
    return (
        <div className={styles.header}>
            <Input />
            <Data />
        </div>
    )
}

export default Header
