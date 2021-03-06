import React, { useState } from 'react';
import {useParams} from 'react-router-dom';
import { ChangeProfileValue, addNewPersonToJSON } from '../App';


const FormData = (props) => {

  // Pass @route for last prop => to use history.push on input(MainPage - new Person) to open new profile
  const {formLabel, baseValue, inputType, type, route=''} = props;
  const { codeLink } = useParams();
  const [inputValue, setValue] = useState(baseValue);
  const sendToDb = (event) => {
    event.preventDefault();
    if (type === 'PERSON') ChangeProfileValue(codeLink, inputValue, inputType);
    if (type === 'NEW_PERSON') {
      // create new profile and open it's page
      addNewPersonToJSON(inputValue, true, route);
    }
  }
  return (
    <div className={`${inputType}Field`}>
      <form name="myForm" onSubmit={sendToDb}>
        <label>{formLabel}</label>
        <input placeholder={`Добавить ${formLabel.toLowerCase()}`} type="text" name={inputType} onChange={event => setValue(event.target.value)} value={inputValue}  />
        <button className="absolute_position" type="submit">Изменить</button>
      </form>
    </div>
);
}



export default FormData;