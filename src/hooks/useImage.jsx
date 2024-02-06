//Images
import snow from '../assets/img/Image.svg';
import cloud from '../assets/img/06_cloudy_color.svg';
import sun from '../assets/img/01_sunny_color.svg';
import rain from '../assets/img/11_heavy_rain_color.svg';
import drizzle from '../assets/img/09_light_rain_color.svg';
import heavyRain from '../assets/img/14_thunderstorm_color (1).svg';
import partlyCloudy from '../assets/img/35_partly_cloudy_daytime_color.svg';
import fog from '../assets/img/15_fog_color.svg';

export const useImage = () => {

    const renderWeatherImage = (weatherCondition, styles) => {
        let imageSource;
        switch (weatherCondition) {
        case 'Thunderstorm':
            imageSource = heavyRain;
            break;
        case 'Drizzle':
            imageSource = drizzle;
            break;
        case 'Rain':
            imageSource = rain;
            break;
        case 'Snow':
            imageSource = snow;
            break;
        case 'Clear':
            imageSource = sun;
            break;
        case 'Clouds':
            imageSource = cloud;
            break;
        case 'Mist': 
            imageSource = fog;
            break;
        default:
            imageSource = partlyCloudy; 
            break;
        }

        return  <img src={imageSource} alt={weatherCondition} style={styles} />;
    };

    return [renderWeatherImage];
};

