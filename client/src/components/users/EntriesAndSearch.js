import classes from './EntriesAndSearch.module.css';
import {useCallback, useEffect, useRef, useState} from "react";

const EntriesAndSearch = props => {
  const tableSearchBarElement = useRef();
  const entriesSelectElement = useRef();
  const tagsContainer = useRef();
  const paragraphElement = useRef();
  const [allUserTags, setAllUserTags] = useState([]);

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

  const entriesChangeHandler = () => {
    props.entriesSelect(entriesSelectElement.current["value"]);
  }

  const searchBarInputHandler = () => {
    props.onSearch(tableSearchBarElement.current["value"]);
  }

  const openTagsContainer = () => {
    if (tagsContainer.current["classList"].contains('display-none')) {
      tagsContainer.current["classList"].remove('display-none');
      tagsContainer.current["parentElement"].children[1].classList.remove('bxs-chevron-down');
      tagsContainer.current["parentElement"].children[1].classList.add('bxs-chevron-up');
    } else {
      tagsContainer.current["classList"].add('display-none');
      tagsContainer.current["parentElement"].children[1].classList.add('bxs-chevron-down');
      tagsContainer.current["parentElement"].children[1].classList.remove('bxs-chevron-up');
    }
  }

  const selectTagHandler = ev => {
    paragraphElement.current["textContent"] = ev.target.textContent;
    props.tagSelect(ev.target.dataset.id);
  }

  return (
    <div className={classes['entries-div']}>
      <label htmlFor="entries">
        Prikazi
        <select onChange={entriesChangeHandler} ref={entriesSelectElement} name="entries" id="entries">
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        korisnika:
      </label>
      <div onClick={openTagsContainer} className={classes['tags-div']}>
        <p ref={paragraphElement}>Odaberi odjeljenje...</p>
        <i className='bx bxs-chevron-down'></i>
        <div ref={tagsContainer} className={`${classes['tags-container']} display-none`}>
          <div onClick={selectTagHandler} data-id={'0'} key={'0'}>Prikazi sve</div>
          {allUserTags && allUserTags.map(tag => <div onClick={selectTagHandler} data-id={tag.id} key={tag.id}>{tag.naziv}</div>)}
        </div>
      </div>
      <div>
        <label htmlFor="table-search">Trazi:</label>
        <input onChange={searchBarInputHandler} ref={tableSearchBarElement} type="text" id="table-search" name="table-search"></input>
      </div>
    </div>
  )
}

export default EntriesAndSearch;