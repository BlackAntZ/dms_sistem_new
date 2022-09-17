import classes from "./EditTagsModal.module.css";
import ReactDOM from "react-dom";
import Button from "../Button/Button";
import {useCallback, useEffect, useState} from "react";
import ConfirmModal from "./ConfirmModal";
import {BackDrop} from "./EditUserModal";

const Modal = props => {
  const [selectedTag, setSelectedTag] = useState(props.userTags[0].id);
  const [selectedParent, setSelectedParent] = useState(props.userTags[0].parent);
  const [editedTags, setEditedTags] = useState(props.userTags);
  const [tagsWereEdited, setTagsWereEdited] = useState(false);

  const selectTagHandler = (ev) => {
    setSelectedTag(ev.target.dataset.id);
    setSelectedParent(ev.target.dataset.parentId);
  }

  const submitFormHandler = ev => {
    ev.preventDefault();
  }

  const [location, setLocation] = useState(null);
  const [tagsCheck, setTagsCheck] = useState('');

  const drawTagCheckboxes = useCallback(parentId => {
    const openFolderHandler = ev => {
      setSelectedParent(ev.target.dataset.id);
      setSelectedTag(0);
    }
    let tagsList = props.tags.map(tag => {
      if (tag.parent === parentId) {
        const checkedHandler = ev => {
          if (!ev.target.classList.contains(classes['tag-checkbox__alt'])) {
            setTagsWereEdited(true);
            setEditedTags(prevState => [...prevState, {id: tag.id, boja: tag.boja, trajanje: ''}])
          }
          else {
            setEditedTags(prevState => prevState.filter(item => item.id !==tag.id));
          }
        }
        return (
          <div data-id={tag.id} onClick={tag.child === '0' ? checkedHandler : ()=>{}} onDoubleClick={tag.child === '0' ? ()=>{} : openFolderHandler} className={`${tag.child === '0' && editedTags.findIndex(userTag => userTag.id === tag.id) !== -1 ? classes['tag-checkbox__alt'] : ''} ${classes['tag-checkbox']}`} key={tag.id}>
            {tag.child === '0' && <i style={{color: `${tag.boja}`}} className='bx bxs-purchase-tag'></i>}
            {tag.child === '0' && tag.naziv}
            {tag.child === '0' && editedTags.findIndex(userTag => userTag.id === tag.id) !== -1 && <i className='bx bxs-badge-check'></i>}
            {tag.child !== '0' && <i data-id={tag.id} className='bx bxs-folder' style={{color: `${tag.boja}`}}></i>}
            {tag.child !== '0' && tag.naziv}
          </div>
        )
      }
      return '';
    })
    setTagsCheck(tagsList);
  },[editedTags, props.tags]);

  const locationRecursion = useCallback((id, content = []) => {
    if (id === '0') {
      content.unshift({id: 0, name: 'Home'});
      return content;
    }
    const currentIndex = props.tags.findIndex(tag => tag.id === id);
    content.unshift({id: id, name: props.tags[currentIndex].naziv});
    return locationRecursion(props.tags[currentIndex].parent, content);
  },[props.tags]);

  const drawTagLocation = useCallback(() => {
    const parentId = selectedParent || props.tags[props.tags.findIndex(tag => tag.id === selectedTag)].parent;
    const transformData = locationRecursion(parentId).map(loca => {
      return (
        <div key={loca.id}>
          <span>/</span><span onClick={changeLocationHandler} data-id={loca.id} className='cursor-pointer'>{loca.name}</span>
        </div>
      )
    });
    setLocation(transformData);
    drawTagCheckboxes(parentId);
  }, [selectedParent, selectedTag, drawTagCheckboxes,locationRecursion, props.tags]);

  useEffect(()=> {
    drawTagLocation();
  }, [selectedTag, drawTagLocation]);

  const changeLocationHandler = ev => {
    setSelectedParent(ev.target.dataset.id >= 0 ? ev.target.dataset.id : '0');
    setSelectedTag(0);
  }

  const confirmCloseModal = () => {
    if (tagsWereEdited) {
      props.tagsEdit();
    }
    else {
      props.closeModal();
    }
  }

  return (
    <form onSubmit={submitFormHandler} className={classes['modal']}>
      <div className={classes['tag-buttons']}>
        {editedTags && editedTags.map(tag =>
          <button data-id={tag.id} data-parent-id={tag.parent} onClick={selectTagHandler} className={`${classes['tag-button']} ${selectedTag === tag.id ? classes['tag-selected'] : ''}`} key={tag.id}>
            <i data-id={tag.id} data-parent-id={tag.parent} style={{color: `${tag.boja}`}} className='bx bxs-purchase-tag'></i>
          </button>
        )}
      </div>
      <div className={classes['tags-div']}>
        <div className={classes['tags-location']}>
          {location}
        </div>
        <div className={classes['check-div']}>
          {tagsCheck}
        </div>
      </div>
      <div className={classes['buttons-div']}>
        <Button type='reset' alt={true} close={confirmCloseModal}>Ponisti</Button>
        <Button type='submit' alt={false} >Sacuvaj</Button>
      </div>
    </form>
  )
}

const EditTagsModal = props => {
  const [openConfirm, setOpenConfirm] = useState(false);

  const openConfirmHandler = () => {
    setOpenConfirm(true);
  }

  const closeConfirmHandler = () => {
    setOpenConfirm(false);
  }

  return (
    <>
      {ReactDOM.createPortal(<Modal tags={props.tags} tagsEdit={openConfirmHandler} userTags={props.userTags} closeModal={props.closeModal}></Modal>, document.getElementById('overlays'))}
      {openConfirm && ReactDOM.createPortal(<BackDrop index={5} closeModal={closeConfirmHandler}></BackDrop>, document.getElementById('overlays'))}
      {openConfirm && ReactDOM.createPortal(<ConfirmModal index={5} closeModal={props.closeModal} cancelClose={closeConfirmHandler}></ConfirmModal>, document.getElementById('overlays'))}
    </>
  )
}

export default EditTagsModal;