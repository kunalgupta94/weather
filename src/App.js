import React, {Component} from 'react';
import './App.css';
import SearchBar from './components/searchbar'
import WeatherCard from './components/weather-card'
import cities from './components/cities-name-list.json'
import fetchJson from 'fetch-jsonp'

class App extends Component {

  state = {
        input: '',
        sets: cities,
        searchValues: [],
        showOptions: false,
        selectedCity: '',
        wetherData: '',
        updated: false
    }

    

    inputHandler = (event) => {
        if (event.target.value === '')
        {this.setState({showOptions: false, updated: false})}
        else {
            this.setState({showOptions: true})
        }
        this.setState({input: event.target.value}, this.searchValues)
    }
    
    optionSelectHandler = (searchValue) => {
        this.fetchWeather(searchValue)
        this.setState({input: searchValue, selectedCity: searchValue,showOptions: false})
        
    }

    searchValues = () => {
        let foundValues = []
        for (let i = 0; i < this.state.sets.length; i++ ){
            if(this.state.input.length > 2)
            {if (this.state.sets[i].toLowerCase().includes(this.state.input)){
                foundValues.push(this.state.sets[i])
            }}
        }
        if(foundValues.length === 0) {
            this.setState({showOptions: false})
        }
        this.setState({searchValues: foundValues}, () => console.log(this.state.searchValues))
    }
    fetchWeather = (selectedCity) => {
      console.log(selectedCity)
      let weatherData = fetchJson("https://api.openweathermap.org/data/2.5/forecast?q="+ selectedCity+",in&appid=25abfc568c923722634b74338594ac54")
      .then(response => response.json())
      .then(json =>{
          console.log(json)
          this.setState({weatherData: json, updated: true}, () => console.log("Weather added"))
        }).catch(function(ex) {
          console.log('parsing failed', ex)
        })
    }

    
      

  render () 
  {
    const details = []
    if (this.state.updated)
    {this.state.weatherData['list'].map((list, index) => {
        let datevalue = new Date()
        let currentDate = parseInt(datevalue.getDate())
        let year = parseInt(list['dt_txt'].substring(0, 4))
        let month = datevalue.toLocaleString('en-in', {  month: 'short' })
        let date = parseInt(list['dt_txt'].substring(8, 10))
        let day = datevalue.toLocaleString('en-in', {  weekday: 'short' })
        let time = parseInt(list['dt_txt'].substring(11,13))
        let ampm = null
        if (time >= 12) {
          time = time - 12;
          if (time === 0 ) {
            time = 12
          }
          ampm = 'pm'
        } else {
          if (time === 0) {
            time = 12
          }
          ampm = 'am'
        }
        console.log(currentDate, date)
        let minimum_temp = (list['main']['temp_min']-273.15).toFixed(1)
        let maximum_temp = (list['main']['temp_max']-273.15).toFixed(1)
        let icon = "http://openweathermap.org/img/wn/"+ list['weather'][0]['icon'] + "@2x.png"
        let wtype = list['weather'][0]['main']
        if (date == currentDate)
        {details.push(<WeatherCard key={index} cityValue={this.state.selectedCity} max_temp={minimum_temp} icon={icon} time={time + " " + ampm} wtype={wtype} day={day} date={month + " " + date} />)}
      })}
      return (
        <div className="app-main-div">
          <h2 className="weather-title">Weather</h2>
          <div className="search-div">
            <SearchBar showOptions={this.state.showOptions} input={this.state.input} searchValues={this.state.searchValues} inputHandler={this.inputHandler} optionSelectHandler={this.optionSelectHandler}/>
          </div>
          <div className="weather-card-div">
            {details}
          </div>
        </div>
    );
}
}

export default App;
