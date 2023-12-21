import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCities } from "../../../feathers/weather/weatherSlice";

//Styles
import styles from './index.module.scss';

const Input = () => {
    const dispatch = useDispatch();
    const [term, setTerm] = useState('');

    const options = useSelector((state) => state.weather.cities);

    const onInputChange = (e) => {
        const value = e.target.value.trimStart();
        setTerm(value);
        if (value === '') return;

        dispatch(fetchCities(value));
    };

    return (
        <div>
            <form className={styles.form}>
                <input 
                    type="text" 
                    placeholder="Search in the city.."
                    value={term}
                    onChange={onInputChange}
                    className={styles.form__input}
                />
                {term ? 
                    <ul className={styles.form__list}>
                        {options.map((option, index) => (
                            <li key={option.name + '-' + index} className={styles.form__autocomplete}>
                                <button className={styles.form__button}>{option.name}, {option.country}</button>
                            </li>
                        ))}
                    </ul>
                : null}
            </form>
        </div>
    );
};

export default Input;