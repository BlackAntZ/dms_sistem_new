import classes from "./TagList.module.css";
import {useCallback, useEffect, useState} from "react";

const TagList = props => {
  const [odjeljenjaList, setOdjeljenjaList] = useState(null);
  const {odjelenja} = props;
  const [selectedTag, setSelectedTag] = useState(`${odjelenja[0].parent}`);
  const [location, setLocation] = useState(null);

  const {onSelect} = props;

  const selectedTagHandler = useCallback( ev => {
    setSelectedTag(ev.target.dataset.id);
    onSelect(ev.target.dataset.id);
  },[onSelect]);


  const drawOdjeljenja = useCallback(() => {
    const transformData = odjelenja.map(odjeljenje => {
      if (odjeljenje.parent === +selectedTag) {
        return (
          <li key={odjeljenje.id}>
            <div className={`${+selectedTag === odjeljenje.id ? classes['selected_tag'] : ''}`} data-id={odjeljenje.id} onClick={selectedTagHandler}>
              <i data-id={odjeljenje.id} className="fa-solid fa-tags"></i>{odjeljenje.naziv}
            </div>
          </li>
        )
      }
      return null;
    });
    setOdjeljenjaList(transformData);
  },[odjelenja, selectedTag, selectedTagHandler])

  const locationRecursion = useCallback((id, content = []) => {
    if (id === '0') {
      content.unshift({id: 0, name: 'Home', boja: ''});
      return content;
    }

    const currentIndex = odjelenja.findIndex(tag => {
      // console.log(tag.id, id, typeof tag.id, typeof id)
      return tag.id === +id;
    });
    content.unshift({id: id, name: odjelenja[currentIndex].naziv, boja: odjelenja[currentIndex].boja});
    return locationRecursion(`${odjelenja[currentIndex].parent}`, content);
  },[odjelenja]);

  const changeLocationHandler = ev => {
    setSelectedTag(ev.target.dataset.id);
  }

  const drawTagLocation = useCallback(() => {
    const transformData = locationRecursion(selectedTag).map(loca => {
      if (loca.id === 0) {
        return (
          <div key={loca.id}>
            <div onClick={changeLocationHandler} data-id={loca.id} className='cursor-pointer'><i data-id={loca.id} className='bx bx-home'></i></div>
          </div>
        )
      }
      return (
        <div key={loca.id}>
          <div>/</div><div onClick={changeLocationHandler} data-id={loca.id} className={`cursor-pointer ${classes['odjeljenje_div']}`}>{loca.name}</div>
        </div>
      )
    });
    setLocation(transformData);
  }, [selectedTag, locationRecursion]);

  useEffect(() => {
    drawOdjeljenja();
    drawTagLocation();
  }, [drawOdjeljenja, selectedTag, drawTagLocation])

  return (
    <div className={`${classes['tag_list']} ${classes['box_shadow']}`}>
      <div className={classes['add_new_tag']}>
        <button onClick={props.onAddTag} id="add_tag" className={classes['add_tag']}><i className='bx bxs-purchase-tag'></i></button>
      </div>
      <div className={classes['location_div']}>
        {location}
      </div>
      <ul className={classes['tree']}>
        {odjeljenjaList}
      </ul>
    </div>
  )
}

export default TagList;