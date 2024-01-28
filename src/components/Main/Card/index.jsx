import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeCity, removeAllCity } from '../../../reducers/cityCard/cardSlice'
//Images
import paginationOne from '../../../assets/img/First.svg'
import paginationTwo from '../../../assets/img/Prev.svg'
import paginationThree from '../../../assets/img/Next.svg'
import paginationFour from '../../../assets/img/Last.svg'
//Styles
import styles from './index.module.scss'
import Recent from './Recent'
import { useTranslation } from 'react-i18next'

const Card = () => {

    const [isActive, setIsActive] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const options = useSelector((state) => state.card.temp)
    const itemsPerPage = 4;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = options.slice(startIndex, endIndex);
    const totalPages = Math.ceil(options.length / itemsPerPage);

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [options, currentPage, totalPages]);

    const handleChangeState = () => {
        setIsActive(!isActive)
    }

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleFirstPage = () => {
        if (currentPage > 1) {
            setCurrentPage(Math.max(1, currentPage - 10));
        } 
    };
    
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleLastPage = () => {
        if (currentPage === 1) {
            setCurrentPage(Math.min(totalPages, currentPage + 9));
        } else if (currentPage < totalPages) {
            setCurrentPage(Math.min(totalPages, currentPage + 10));
        }
    };

    const dispatch = useDispatch()

    const removeFromLocalStorage = (idRemove) => {
        dispatch(removeCity(idRemove))
    }

    const removeAllLocalStorageData = () => {
        dispatch(removeAllCity(options.id))
        setIsActive(!isActive)
    }

    const {t} = useTranslation()

    return (
        (options.length ? 
            <div className={styles.allCard}>
                <Recent 
                    currentItems={currentItems}
                    isActive={isActive} 
                    handleChangeState={handleChangeState}
                    removeAllLocalStorageData={removeAllLocalStorageData}
                    removeFromLocalStorage={removeFromLocalStorage}
                />
                {options.length >= 4 ?
                    <div className={styles.pagination}>
                        <div className={styles.pagination__container}>
                            <button className={styles.pagination__btn} onClick={handleFirstPage}><img src={paginationOne} alt="paginationFirst" /></button>
                            <button className={styles.pagination__btn} onClick={handlePreviousPage}><img src={paginationTwo} alt="paginationTwo" /></button>
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
                            <button className={styles.pagination__btn} onClick={handleNextPage}><img src={paginationThree} alt="paginationThree" /></button>
                            <button className={styles.pagination__btn} onClick={handleLastPage}><img src={paginationFour} alt="paginationFour" /></button>
                        </div>
                    </div>
                : null}
            </div> 
            : 
            <div className={styles.allCard}>
                <div className={styles.allCards}>
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
