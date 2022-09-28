import {Calendar} from 'react-date-range';
import {format} from "date-fns";
import classes from "./DatePicker.module.css";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import {useEffect, useRef, useState} from "react";

const DatePicker = props => {
  const [date, setDate] = useState(null);
  const [open, setOpen] = useState(!props.edit);
  const datePicker = useRef();
  const input = useRef();

  let transformedDate = '';
  if (props.edit) {
    transformedDate = props.value.split('/');
    transformedDate = `${transformedDate[1]}/${transformedDate[0]}/${transformedDate[2]}`;
  }

  useEffect(()=> {
    props.edit ? setDate(format(new Date(transformedDate), 'dd/MM/yyyy')) : setDate(format(new Date(), 'dd/MM/yyyy'));
    document.addEventListener('keydown', hideOnEsc, true);
    document.addEventListener('click', hideOnClickOutside, true);
  },[props.edit, props.value]);

  const hideOnEsc = ev => {
    if (ev.key === 'Escape') {
      setOpen(false);
    }
  }

  const hideOnClickOutside = ev => {
    if (ev.target === input.current) return setOpen(prevState => !prevState);
    if (datePicker.current && !datePicker.current['contains'](ev.target)) setOpen(false);
  }

  const selectHandler = value => {
    const transformedFormat = format(value, 'dd/MM/yyyy')
    setOpen(false);
    setDate(transformedFormat);
    props.onSelect(transformedFormat);
  }

  return (
    <div className={classes.container}>
      {date && <input ref={input} value={`${date}`} readOnly={true}/>}
      {open &&
        <div className={`${classes.date__picker} ${props.alt ? classes.date__picker__alt : ''}`} ref={datePicker}>
          <Calendar date={new Date()} onChange={selectHandler}></Calendar>
        </div>
      }
    </div>
  );
};

export default DatePicker;