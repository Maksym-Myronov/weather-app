import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { removeCity, removeAllCity } from '../../../reducers/cityCard/cardSlice'
import { useTranslation } from 'react-i18next'
import { usePagination } from '../../../hooks/usePagination'
import useTheme from '../../../hooks/useTheme'
import Recent from './Recent'
//Images
import paginationOne from '../../../assets/img/First.svg'
import paginationTwo from '../../../assets/img/Prev.svg'
import paginationThree from '../../../assets/img/Next.svg'
import paginationFour from '../../../assets/img/Last.svg'
//Styles
import styles from './index.module.scss'

const Card = () => {
    const [isActive, setIsActive] = useState(false);
    const [handlePreviousPage, handleLastPage, handleNextPage, handleFirstPage, currentItems, temp, setCurrentPage, currentPage, totalPages] = usePagination()
    const {t} = useTranslation()
    const {isDark} = useTheme()

    const handleChangeState = () => {
        setIsActive(!isActive)
    }

    const dispatch = useDispatch()

    const removeFromLocalStorage = (idRemove) => {
        dispatch(removeCity(idRemove))
    }

    const removeAllLocalStorageData = () => {
        dispatch(removeAllCity(temp.id))
        setIsActive(!isActive)
    }

    return (
        (temp.length ? 
            <div className={styles.allCard}>
                <Recent 
                    currentItems={currentItems}
                    isActive={isActive} 
                    handleChangeState={handleChangeState}
                    removeAllLocalStorageData={removeAllLocalStorageData}
                    removeFromLocalStorage={removeFromLocalStorage}
                />
                {temp.length >= 4 ?
                    <div className={styles.pagination}>
                        <div className={isDark ? styles.pagination__container : styles.pagination__white}>
                            <button className={isDark ? styles.pagination__btn : styles.pagination__btn__white} onClick={handleFirstPage}><img src={paginationOne} alt="paginationFirst" /></button>
                            <button className={isDark ? styles.pagination__btn : styles.pagination__btn__white} onClick={handlePreviousPage}><img src={paginationTwo} alt="paginationTwo" /></button>
                            <div className={styles.pagination__block}>
                                {[...Array(totalPages)].map((_, item) => (
                                    <button
                                        key={item}
                                        className={`${styles.pagination__number} ${currentPage === item + 1 ? styles.active : ''}`}
                                        onClick={() => setCurrentPage(item + 1)}
                                    >
                                        {item + 1}
                                    </button>
                                ))}
                            </div>
                            <button className={isDark ? styles.pagination__btn : styles.pagination__btn__white} onClick={handleNextPage}><img src={paginationThree} alt="paginationThree" /></button>
                            <button className={isDark ? styles.pagination__btn : styles.pagination__btn__white} onClick={handleLastPage}><img src={paginationFour} alt="paginationFour" /></button>
                        </div>
                    </div>
                : null}
            </div> 
            : 
            <div className={styles.allCard}>
                <div className={isDark ? styles.allCards : styles.allCards__recent__black}>
                    <h1 className={styles.allCards__recent}>{t("recent")}</h1>
                </div>
                <div className={styles.local__error}>
                    <p>{t("Loading")}</p>
                </div>
            </div> 
        )
    );
}

export default Card
