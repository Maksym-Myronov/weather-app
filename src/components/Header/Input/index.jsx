import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCities } from "../../../store/weatherSlice";
import { getCity } from "../../../store/cardSlice";
import { useTranslation } from "react-i18next";
import useTheme from "../../../hooks/useTheme";
//Images
import reactIcon from '../../../assets/img/Integration icons.svg'
import search from '../../../assets/img/search.svg'
//Styles
import styles from './index.module.scss';

const Input = () => {
    const dispatch = useDispatch();
    const [term, setTerm] = useState('');
    const [selectedLocation, setSelectedLocation] = useState(null);
    const {isDark} = useTheme()

    const options = useSelector((state) => state.weather.cities);

    const onInputChange = (e) => {
        e.preventDefault()
        const value =  (e.target.value || '').trimStart();
        setTerm(value);
        if (value === '') return;
        dispatch(fetchCities(value));
    };

    useEffect(() => {
        if (selectedLocation) {
            dispatch(getCity({lat: selectedLocation.lat, lon: selectedLocation.lon}));
        }
    }, [selectedLocation, dispatch]);

    const handleButtonClick = () => {
        if(options.length > 0) {
            setSelectedLocation({lat: options[0].lat, lon: options[0].lon})
            setTerm('')
        }
    }

    const {t} = useTranslation()

    return (
        <div className={styles.form}>
            <div className={styles.form__logo}>
                <img src={reactIcon} alt="reactIcon" className={styles.form__react} />
                <h1 className={isDark ? styles.form__text : styles.form__white}>Maksym Weather App</h1>
            </div>
            <form className={styles.form__forms} onSubmit={onInputChange}>
                <div className={isDark ? styles.form__searchInupt : styles.form__input__dark}> 
                    <img src={search} alt="search" className={styles.form__search} />
                    <input 
                        type="text" 
                        placeholder={t("placeholder")}
                        value={term}
                        onChange={onInputChange}
                        className={styles.form__input }
                    />
                </div>
                {term ? 
                    <ul className={styles.form__list}>
                        {options.map((option, index) => (
                            <li key={option.name + '-' + index} className={styles.form__autocomplete}>
                                <button className={styles.form__button} onClick={() => setSelectedLocation({ lat: option.lat, lon: option.lon })}>{option.name}, {option.country}</button>
                            </li>
                        ))}
                    </ul>
                : null}
            </form>
            <div>
                <button className={styles.form__btn} onClick={handleButtonClick}>{t("search")}</button>
            </div>
        </div>
    );
};

export default Input;