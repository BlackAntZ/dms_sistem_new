import classes from "./PageButtons.module.css";
import {useRef} from "react";

const PageButtons = props => {
  const divOfTablePageNumbers = useRef();

  const changePageHandler = number => {
    if (number === 'ADD') return props.onSelect(props.selectedPage+1);
    if (number === 'SUB') return props.onSelect(props.selectedPage-1);
    return props.onSelect(number);
  }

  let pageNumbers = [];
  const pages = Math.ceil(props.users.length / +props.entries);
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  const content = pageNumbers.map(number => {
    return (
      <div key={number} onClick={number === props.selectedPage ? ()=>{} : changePageHandler.bind(null, number)} className={`${classes['page-number']} ${number === props.selectedPage ? classes['page-number__selected'] : ''}`}>{number}</div>
    )
  })
  const endDiv = <div onClick={props.selectedPage === pages ? ()=>{} : changePageHandler.bind(null,'ADD')} className={props.selectedPage !== pages ? `${classes['page-number']}` : `${classes['previous__disabled']}`}>Sljedeca</div>;

  return (
    <div className={classes['table-footer']}>
      <p>Prikazani korisnici od <span>{props.statistics[0]}</span> do <span>{props.statistics[1]}</span> od ukupno <span>{props.statistics[2]}</span></p>
      <div ref={divOfTablePageNumbers} className={classes['page-choice']}>
        {props.selectedPage === 1 ? <div className={classes['previous__disabled']}>Prethodna</div> : <div onClick={changePageHandler.bind(null,'SUB')} className={classes['page-number']}>Prethodna</div>}
        {content}
        {endDiv}
      </div>
    </div>
  )
}

export default PageButtons;