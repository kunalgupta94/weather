import React, {Component} from 'react';
import './searchbar.css';


//showOption
//input
//searcValues
//inputHandler
//optionSelectorHandler

const SearchBar = (props) => {
    let divVar = []
    if (props.showOptions && (props.input !== '')) {
        props.searchValues.map((searchValue, index) => {
        divVar.push(<button className="menuOption" key={index} onClick={() => {props.optionSelectHandler(searchValue); console.log("done")}}>{searchValue}</button>)
    })}
  return (
      <div className="mainDiv">
        <input onChange={props.inputHandler} type="text" className={props.showOptions ? "inputfield-after": "inputfield-initial"} value={props.input}/>
        
        { props.showOptions ? 
        <div className="drowndownContent">
            {divVar}
        </div>: null}
      </div>
  )}

export default SearchBar;
