import React, { useState } from 'react';
import moment from 'moment';
import {useParams} from 'react-router-dom';
import Calendar from 'react-calendar';
import { ChangeProfileValue } from '../App';



const CalendarHideable = (props) => {
  const [renderCalendar,setRenderCalendar] = useState('none');
  const { codeLink } = useParams();

  function changeDate(dateTo) {
    const date = moment(dateTo).format('DD-MM-YYYY');
    props.dateType === 'setParent' ?
      props.setParentDate(date) :
      ChangeProfileValue(codeLink, date, props.dateType);
      setRenderCalendar('none');
  }
  return (
    <>
      <div className={`${props.dateType  }Field`}>
        <label>{props.сalendarName}</label>
        <input onClick={() => setRenderCalendar('block')} type="text" readOnly value={props.date} />
      </div>
      <div style={{display:renderCalendar}} className="calendar" id="calendar">
        <Calendar className="calendar" onChange={date => changeDate(date)} />
        <button type="button" onClick={() => setRenderCalendar('none')}>Убрать календарь</button>
        <button type="button" onClick={() => changeDate(null)}>Удалить дату</button>
      </div>
    </>
);
}

export default CalendarHideable;