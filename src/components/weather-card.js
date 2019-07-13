import React from 'react'
import './weather-card.css'
//Function based card, does not have a state and requires props from outside.
//This is a stateless component as it is not complicated and focuses mainly on visuals
//Only values are required to be passed via props

//props required:
    // 1. Weather image
    // 2. day
    // 3. time
    // 4. temperature
    // 5. location
    //using font-awesome for images
        // <script src="https://kit.fontawesome.com/72d4104e38.js"></script>

const WeatherCard = (props) => {
    return(
        <div className="weather-mainDiv">
            <p className="weather-type">{props.wtype}</p>
            <img className="fas fa-cloud weather-icon" src={props.icon} />{
                //keep the class "icon" while adding logic to the icons to keep the component intact
            }
            <div className="weather-date-time">
                {
                    //Here goes the City prop
                }
                <p className="weather-time">{props.time}</p>
                {
                    //Here goes the day prop
                }
                <p className="weather-day">{props.day}, <span className="weather-date">{props.date}</span></p>
            </div>
            <div className="weather-temperature">
                    <p className="weather-max-low">Temp</p>
                    <p>{props.max_temp}&#176;</p>            
            </div>            
        </div>
    );
}

export default WeatherCard