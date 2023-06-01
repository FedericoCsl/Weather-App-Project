import React from 'react';
import {WiDaySunny, WiCloudy, WiRain, WiSnow} from 'weather-icons-react';


const WeatherIcon = ({weatherCondition}) => {
    switch (weatherCondition) {
        case 'Clear':
            return <WiDaySunny />;
        case 'Clouds' :
            return <WiCloudy />;
        case 'Rain' : 
            return <WiRain />;
        case 'Snow' : 
            return <WiSnow />;
        default:
            return null;
    }
};



export default WeatherIcon;