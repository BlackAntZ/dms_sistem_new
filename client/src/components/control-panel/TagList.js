import classes from "./TagList.module.css";
import {useCallback, useEffect, useState} from "react";

const TagList = props => {
  const [odjeljenjaList, setOdjeljenjaList] = useState([]);
  const {odjelenja} = props;
  const [selectedPath, setSelectedPath] = useState({path: [odjelenja[0].parent], current: odjelenja[0].parent});

  const {onSelect} = props;

  const doubleClickHandler = useCallback( ev => {
    setSelectedPath(prevState => {
      let path = [...prevState.path];
      const index = prevState.path.indexOf(+ev.target.dataset.id)
      index > -1 ? path.splice(index,1) : path.push(+ev.target.dataset.id);
      return {
        path: path,
        current: prevState.current
      }
    })
  },[]);

  const oneClickHandler = useCallback( ev => {
    setSelectedPath(prevState => {return {path: prevState.path, current: +ev.target.dataset.id}})
    onSelect(ev.target.dataset.id);
  },[onSelect]);

  const recursionTree = useCallback((stepen = 0, tree = []) => {
    tree.push(
      <ul className={`${stepen === 0 ? classes['tree'] : ''}`} key={stepen}>
        {odjelenja.filter(tag => tag.parent === stepen).map(tagM => {
          if (selectedPath.path.indexOf(stepen) === -1) return null;
          return (
            <li key={tagM.id}>
              <div className={`${selectedPath.current === tagM.id  ? classes['selected_tag'] : ''}`} data-id={tagM.id} onClick={oneClickHandler} onDoubleClick={doubleClickHandler}>
                <i data-id={tagM.id} className="fa-solid fa-tags"></i>
                {tagM.naziv}
                {tagM.child > 0 && <i className={`bx bxs-collection ${classes['has_children']}`} data-id={tagM.id}></i>}
              </div>
              {tagM.child > 0 && (recursionTree(tagM.id))}
            </li>
          )
        })}
      </ul>
    )
    return tree;
  },[odjelenja, selectedPath, doubleClickHandler, oneClickHandler]);

  useEffect(()=> {
    setOdjeljenjaList(recursionTree());
  },[recursionTree]);

  // const locationRecursion = useCallback((id, content = []) => {
  //   if (id === '0') {
  //     content.unshift({id: 0, name: 'Home', boja: ''});
  //     return content;
  //   }
  //
  //   const currentIndex = odjelenja.findIndex(tag => {
  //     return tag.id === +id;
  //   });
  //   content.unshift({id: id, name: odjelenja[currentIndex].naziv, boja: odjelenja[currentIndex].boja});
  //   return locationRecursion(`${odjelenja[currentIndex].parent}`, content);
  // },[odjelenja]);
  //
  // const drawTagLocation = useCallback(() => {
  //   const transformData = locationRecursion(selectedPath).map(loca => {
  //     if (loca.id === 0) {
  //       return (
  //         <div key={loca.id}>
  //           <div onClick={selectedTagHandler} data-id={loca.id} className='cursor-pointer'><i data-id={loca.id} className='bx bx-home'></i></div>
  //         </div>
  //       )
  //     }
  //     return (
  //       <div key={loca.id}>
  //         <div>/</div><div onClick={selectedTagHandler} data-id={loca.id} className={`cursor-pointer ${classes['odjeljenje_div']}`}>{loca.name}</div>
  //       </div>
  //     )
  //   });
  //   setLocation(transformData);
  // }, [selectedPath, locationRecursion, selectedTagHandler]);

  return (
    <div className={`${classes['tag_list']} ${classes['box_shadow']}`}>
      <div className={classes['add_new_tag']}>
        <button onClick={props.onAddTag} id="add_tag" className={classes['add_tag']}><i className='bx bxs-purchase-tag'></i></button>
      </div>
      {/*<div className={classes['location_div']}>*/}
      {/*  {location}*/}
      {/*</div>*/}
      {odjeljenjaList}
    </div>
  )
}

export default TagList;