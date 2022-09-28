import classes from "./UsersFilter.module.css";
import {useCallback, useEffect, useRef, useState} from "react";
import Button from "../UI/Button/Button";

const UsersFilter = props => {
  const [allUserTags, setAllUserTags] = useState([]);
  const tagsContainer = useRef();
  const paragraphElement = useRef();

  const fillUserTags = useCallback(() => {
    const newListData = [];
    for (const user of props.users) {
      for (const odjeljenjaElement of user.odjeljenja) {
        if (newListData.findIndex(element => element.id === odjeljenjaElement.id) === -1) {
          const index = props.tags.findIndex(tag => tag.id === odjeljenjaElement.id);
          newListData.push({...odjeljenjaElement, naziv: props.tags[index].naziv});
        }
      }
    }
    setAllUserTags(newListData);
  },[props.tags, props.users]);

  useEffect(()=>{
    fillUserTags()
  },[fillUserTags]);

  const selectTagHandler = ev => {
    paragraphElement.current['children'][0]["textContent"] = ev.target.textContent;
    // props.tagSelect(ev.target.dataset.id);
  }

  const openTagsContainer = () => {
    if (tagsContainer.current["classList"].contains('display-none')) {
      tagsContainer.current["classList"].remove('display-none');
      tagsContainer.current["parentElement"].children[1].children[1].classList.remove('bxs-chevron-down');
      tagsContainer.current["parentElement"].children[1].children[1].classList.add('bxs-chevron-up');
    } else {
      tagsContainer.current["classList"].add('display-none');
      tagsContainer.current["parentElement"].children[1].children[1].classList.add('bxs-chevron-down');
      tagsContainer.current["parentElement"].children[1].children[1].classList.remove('bxs-chevron-up');
    }
  }

  const submitFiltersHandler = ev => {
    ev.preventDefault();
  }

  return (
    <div className={classes['filter_div']}>
      <div className={classes['filter_label']}>Filteri</div>
      <form onSubmit={submitFiltersHandler}>
        <div>
          <label htmlFor={'filter_ime'}>Ime:</label>
          <input id={'filter_ime'} type={"text"}/>
        </div>
        <div>
          <label htmlFor={'filter_prezime'}>Prezime:</label>
          <input id={'filter_prezime'} type={"text"}/>
        </div>
        <div>
          <label htmlFor={'filter_email'}>Email:</label>
          <input id={'filter_email'} type={"email"}/>
        </div>
        <div onClick={openTagsContainer} className={classes['tags-div']}>
          <label>Odjeljenje:</label>
          <div ref={paragraphElement}>
            <p></p>
            <i className='bx bxs-chevron-down'></i>
          </div>
          <div ref={tagsContainer} className={`${classes['tags-container']} display-none`}>
            <div onClick={selectTagHandler} data-id={'0'} key={'0'}>Prikazi sve</div>
            {allUserTags && allUserTags.map(tag => <div onClick={selectTagHandler} data-id={tag.id} key={tag.id}>{tag.naziv}</div>)}
          </div>
        </div>
        <div>
          <label htmlFor={'filter_grad'}>Grad:</label>
          <input id={'filter_grad'} type={"text"}/>
        </div>
        <div>
          <label htmlFor={'filter_drzava'}>Drzava:</label>
          <input id={'filter_drzava'} type={"text"}/>
        </div>
        <div>
          <label htmlFor={'filter_datum_rodjenja'}>Datum rodjenja:</label>
          <input id={'filter_datum_rodjenja'} type={"text"}/>
        </div>
        <div>
          <Button>Trazi</Button>
        </div>
      </form>
    </div>
  )
}

export default UsersFilter;